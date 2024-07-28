// src/components/auth/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import '../../styles/landing.css';
import '../../styles/globalForms.css';
import '../../styles/globalTypography.css';
import '../../styles/globalButtons.css';
import '../../styles/verifyEmail.css';
import backgroundImage from '../../assets/background.jpeg';
import logo from '../../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent successfully. Please check your inbox.');
      setError('');
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="landing-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="header-bar">
        <img src={logo} alt="iamBudget Logo" className="logo" />
      </div>
      <div className="content-wrapper">
        <div className="right-content">
          <h2>Forgot Password</h2>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Reset Password</button>
          </form>
          <p onClick={() => navigate('/')} className="form-switch">Back to Login</p>
        </div>
      </div>
      <div className="footer-bar">
        <a href="#terms">Terms of Use</a> | 
        <a href="#privacy">Privacy</a> | 
        <a href="#faq">FAQ</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
