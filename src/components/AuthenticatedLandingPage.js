import React from 'react';
import '../styles/landing.css';
import '../styles/globalForms.css';
import '../styles/globalButtons.css';
import '../styles/globalTypography.css';

const AuthenticatedLandingPage = () => {
  return (
    <div className="authenticated-landing-page">
      <h1>Welcome to iamBudget</h1>
      <p>You are successfully logged in and verified. You can navigate through the application using the menu above.</p>
    </div>
  );
};

export default AuthenticatedLandingPage;
