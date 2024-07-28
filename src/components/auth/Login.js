import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import '../../styles/globalForms.css';
import '../../styles/globalTypography.css';
import '../../styles/globalButtons.css';
import getMessage from '../../utils/messages';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        navigate('/verify-email', { state: { email } });
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(getMessage('auth', error.code));
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p onClick={() => navigate('/register')} className="form-switch">
        Don't have an account? Register
      </p>
      <p onClick={() => navigate('/forgot-password')} className="form-switch">
        Forgot Password?
      </p>
    </div>
  );
};

export default Login;
