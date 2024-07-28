// src/components/LandingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/landing.css';
import '../styles/globalForms.css';
import '../styles/globalTypography.css';
import '../styles/globalButtons.css';
import backgroundImage from '../assets/background.jpeg';
import logo from '../assets/logo.png';
import { auth, db } from '../firebase';

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          navigate('/authenticated-landing');
        } else {
          navigate('/verify-email', { state: { email: user.email } });
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (location.state && location.state.isLogin) {
      setIsLogin(true);
    }
  }, [location]);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (!user.emailVerified) {
          navigate('/verify-email', { state: { email } });
        } else {
          navigate('/authenticated-landing');
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);

        // Kullanıcıyı Firestore'a kaydedin
        await setDoc(doc(db, 'users', user.uid), {
          userId: user.uid,
          email: user.email,
          registrationDate: new Date().toISOString(),
          isVerified: false,
          verificationDate: null
        });

        navigate('/verify-email', { state: { email } });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="landing-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="header-bar">
        <img src={logo} alt="iamBudget Logo" className="logo" />
      </div>
      <div className="content-wrapper">
        <div className="left-content">
          <h1>iamBudget</h1>
          <p>Welcome to iamBudget, the ultimate solution for managing your finances efficiently. With iamBudget, you can effortlessly track your expenses, create and manage budgets, and analyze your spending patterns. Our user-friendly platform provides you with all the tools you need to take control of your finances. Whether you're looking to save money, reduce debt, or simply gain a better understanding of your financial habits, iamBudget is here to help. Join our community today and start your journey towards financial freedom. Our features include real-time expense tracking, customizable budget templates, and detailed financial reports. With iamBudget, you'll always know where your money is going and how to make the most of it.</p>
          <ul>
            <li>Track your expenses effortlessly</li>
            <li>Create and manage budgets</li>
            <li>Analyze your spending patterns</li>
          </ul>
        </div>
        <div className="right-content">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
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
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p onClick={handleSwitch} className="form-switch">
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </p>
          {isLogin && (
            <p onClick={() => navigate('/forgot-password')} className="form-switch">
              Forgot Password?
            </p>
          )}
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

export default LandingPage;
