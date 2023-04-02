import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './forgotPassword.scss';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const EMAIL_REGEX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (!EMAIL_REGEX.test(email)) {
        setError("Invalid email format.");
        return;
      }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setError('Error sending password reset email. Please try again.');
      return;
    }
    };

  return (
    <div className="forgotPassword">
      <form onSubmit={resetPassword}>
        <h1>Forgot Password</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <div className="formInput">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Link
          to="/login"
          style={{ textDecoration: "underline", color: "black" }}
        >
          Sign in?
        </Link>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;