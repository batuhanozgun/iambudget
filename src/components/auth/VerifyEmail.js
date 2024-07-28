import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import '../../styles/landing.css';
import '../../styles/globalForms.css';
import '../../styles/globalTypography.css';
import '../../styles/globalButtons.css';
import '../../styles/verifyEmail.css';
import logo from '../../assets/logo.png';

const VerifyEmail = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        navigate('/', { state: { isLogin: true } });
      } else {
        alert('Email is not verified yet. Please check your inbox and click on the verification link.');
      }
    } else {
      navigate('/', { state: { isLogin: true } });
    }
  };

  return (
    <div className="landing-page">
      <div className="header-bar">
        <img src={logo} alt="iamBudget Logo" className="logo" />
      </div>
      <div className="content-wrapper">
        <div className="verify-container">
          <div className="verify-content">
            <h1>Verify Your Email</h1>
            <p>
              Thank you for registering with iamBudget. To complete your registration, please verify your email address. We have sent a verification link to <strong>{email}</strong>. Please check your inbox and click on the link to activate your account. If you did not receive the email, please check your spam folder or request a new verification email.
            </p>
            <ul>
              <li>1 - Check your inbox for the verification email</li>
              <li>2 - Click the verification link</li>
              <li>3 - Enjoy managing your budget with iamBudget</li>
            </ul>
            <p>
              <span onClick={handleLogin} className="btn btn-primary">Login</span>
            </p>
          </div>
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

export default VerifyEmail;
