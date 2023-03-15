import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FacebookRounded,
  Visibility,
  VisibilityOff,
  } from '@mui/icons-material';
import "./login.scss";
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate= useNavigate();

  const {dispatch} = useContext(AuthContext);


  const handleToggle = (e) => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password")
  };
  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try{
      signInWithEmailAndPassword(auth, inputs.emailAddress, inputs.password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({type: "LOGIN_SUCCESS", payload: user});
        console.log(user);
        navigate("/");
      });
    } catch(error){
      dispatch({type: "LOGIN_FAILURE"});
    }
  };

  const signInWithGoogle = (e) =>{
    dispatch({type: "LOGIN_START"});
    signInWithPopup(auth,provider).then((result)=>{
      console.log(result);
    });
  };

  return (
    <div className='login'>
        <form>
          <h2>Login</h2>
          <div className="formInput">
            <input 
              type="email" 
              name="emailAddress" 
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
              {toggleEye?<Visibility/>:<VisibilityOff/>}
            </div>
          </div>
          
          <button type="submit" onClick={handleLogin}>Login</button>

        <div className="formlink">
          <span>Don't have an account? </span>
          <Link 
          to="/register" 
          className="formSignup" 
          style={{textDecoration: "none"}}
          >
            SignUp here
            </Link>
        </div>
        
        <div className="line"></div>
        
        <div className="media-options">
          <Link to="#" 
          className="facebook" 
          style={{textDecoration:"none"}}>
          <FacebookRounded className="facebookIcon"/>
          <span>Login with Facebook</span>
           </Link>
        </div>

        <div className="media-options">
          <Link to="#" 
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

export default Login;