import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "./../../context/AuthContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleToggle = (e) => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
  
      const user = userCredential.user;
      if (user.emailVerified) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/pantry");
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        alert("Your email is not verified. Please check your email inbox for a verification email.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      alert("Error signing in. Please check your email and password.");
    }
  };
  

  const signInWithGoogle = () => {
    dispatch({ type: "LOGIN_START" });

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };
  // console.log(inputs);
  return (
    <div className="login">
      <form>
        <h1>Login Form</h1>
        <div className="formInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
        </div>
        <div className="formInput">
          <input
            type={inputType}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="eyeIcon" onClick={handleToggle}>
            {toggleEye ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
        <Link
          to="/forgotpassword"
          style={{ textDecoration: "underline", color: "black" }}
        >
          Forgot Password?
        </Link>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="formLink">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="formSignup"
            style={{ textDecoration: "underlined", color:"black" }}
          > {""}
            SignUp
          </Link>
        </div>
        <div className="line"></div>
        <div className="media-options">
          <Link
            to="#"
            className="facebook google"
            style={{ textDecoration: "none" }}
            onClick={signInWithGoogle}
          >
            <img src="/assets/google.png" alt="" className="googleImg" />
            <span>Login with Google</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;