import { useContext, useState } from "react";
import { useRef, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./update.scss";

const USER_REGEX = /^[A-z][A-z0-9]{3,19}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Update = () => {
  const userRef = useRef();
  
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      if (userRef.current) {
        userRef.current.focus();
      }
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const isGoogleUser = currentUser.providerData.some((provider) => provider.providerId === "google.com");
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      return;
    }
  
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, pwd);
      await reauthenticateWithCredential(currentUser, credential);
  
      // Save the current email to revert back in case of error
      const currentEmail = currentUser.email;
  
      try {
        // Update the email and check for errors
        await updateEmail(currentUser, email);
  
        // Send verification email after updating the email
        await sendEmailVerification(currentUser).then(() => {
          console.log("Email verification sent");
        });
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          // Revert email change if there's a duplicate email error
          await updateEmail(currentUser, currentEmail);
          alert("This email is already in use, please use another email.");
          return;
        } else {
          alert("An error occurred while updating the email. Please try again.");
          return;
        }
      }
  
      // Update the username if there's no duplicate email error
      await updateProfile(currentUser, {
        displayName: user,
      });
  
      alert(
        "Account updated successfully! Please check your email inbox for a verification email."
      );
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      alert("An error occurred. Please try again.");
      return;
    }
  };
  
  

  // console.log(data);
  return (
    <div className="update">
      <div className="updateWrapper">
        <h3 className="updateTitle">Edit Your Account</h3>
        <span>Fullname: {currentUser.displayName}</span>
        <span>Email Address: {currentUser.email}</span>
        <button type="submit" className="savedrecipesButton" onClick={()=>{navigate("/savedrecipes")}}>
              View your saved recipes here 
            </button>
        <div className="updateContainer">
        {isGoogleUser ? (
            <div className="googleUserWarning">
              <p>
                You are signed in with Google, and you cannot update your profile through this form.
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <label htmlFor="username">
                Fullname
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                placeholder={currentUser.displayName}
                onChange={(e) => setUser(e.target.value)}
                required
                autoComplete="off"
                value={user}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Fullname should be 4 - 20 characters with no special character.
              </p>

              <label htmlFor="email">
                Email Address
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
              </label>
              <input
                type="email"
                id="newEmail"
                placeholder={currentUser.email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                value={email}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Email must be a valid email.
              </p>

              <label htmlFor="password">
                Enter current password to save changes
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="oldPassword"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
              <button disabled={!validName || !validPwd ? true : false}>Update Profile</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Update