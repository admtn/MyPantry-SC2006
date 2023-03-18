import React, { useContext, useState } from 'react'
import FormInput from '../../components/formInput/FormInput';
import {FacebookRounded} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'
import './register.scss'
import { auth, provider } from "../../firebase";
import { updateProfile, createUserWithEmailAndPassword, signInWithPopup,} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const[inputValues, setInputValues] = useState({
    fullname:"",
    emailAddress:"",
    password:"",
    confirmPassword:"",
  });

const navigate = useNavigate();
const inputs = [
  {
    id: 1,
    name: "fullname",
    type: "text",
    placeholder:"Fullname",
    errorMessage:"Fullname should be 4-16 characters and should not include any special characters",
    pattern: "^[A-Za-z0-9]{4,16}$",
    required: true,
  },
  {
    id: 2,
    name: "emailAddress",
    type: "email",
    placeholder:"Email Address",
    errorMessage:"Email Address should be a valid email",
    required: true,
  },
  {
    id: 3,
    name: "password",
    type: "text",
    placeholder:"Password",
    errorMessage:"Password should be 8-20 characters and include at least 1 uppercase, 1 lowercase, 1 number, 1 special character",
    pattern: `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}$`,
    required: true,
  },
  {
    id: 4,
    name: "confirmPassword",
    type: "text",
    placeholder:"Confirm Password",
    errorMessage:"Passwords do not match",
    pattern: inputValues.password,
    required: true,
  },
]

const handleChange = (e) =>{
  setInputValues({...inputValues,[e.target.name]: e.target.value});
};
const handleRegister = async (e) =>{
  e.preventDefault();

  try{
      await createUserWithEmailAndPassword(
      auth, 
      inputValues.emailAddress, 
      inputValues.password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: inputValues.fullname,
      });
      navigate("/login");
    });
  } catch(error){}
};

const signInWithGoogle = () => {
  dispatch({ type: "LOGIN_START" });

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      // The signed-in user info.
      const user = result.user;
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      navigate("/");
    })
    .catch((error) => {
      dispatch({ type: "LOGIN_FAILURE" });
    });
};

  return (
    <div className='register'>
      <form>
        <h2>Registration Form</h2>
        {inputs.map((input)=>(
          <FormInput 
            key={input.id} 
            {...input} 
            values={inputValues[input.name]}
            onChange={handleChange}
            />
          ))}
        <button type="submit" onClick={handleRegister}>Register</button>

        <div className="formlink">
          <span>Already have an account? </span>
          <Link to="/login" className="formSignup" style={{textDecoration: "none"}}>SignIn here</Link>
        </div>
        
        <div className="line"></div>
        <div className="media-options">
          <Link 
            to="#" 
            className="facebook google" 
            style={{textDecoration:"none"}}
            onClick={signInWithGoogle}
            >
          <img src="/assets/google.png" alt="" className="googleImg"/>
          <span>Login with Google</span>
           </Link>
        </div>
      </form>
      </div>
  )
};

export default Register;