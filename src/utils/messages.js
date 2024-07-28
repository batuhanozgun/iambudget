// src/utils/messages.js
const messages = {
    auth: {
      'auth/email-already-in-use': 'This email address is already in use.',
      'auth/invalid-email': 'This email address is not valid.',
      'auth/user-not-found': 'No user found with this email address.',
      'auth/wrong-password': 'The password is incorrect.',
      'auth/weak-password': 'The password is too weak. Please choose a stronger password.',
      'auth/network-request-failed': 'A network error has occurred. Please try again later.',
      'auth/user-disabled': 'This user account has been disabled.',
      'auth/operation-not-allowed': 'This operation is not allowed.',
      'auth/requires-recent-login': 'This operation is sensitive and requires recent authentication. Please log in again.',
      'auth/invalid-credential': 'The credential provided is malformed or has expired.',
      'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in credentials. Please use a different sign-in method.',
      'auth/invalid-verification-code': 'The verification code provided is invalid.',
      'auth/invalid-verification-id': 'The verification ID provided is invalid.',
      'auth/internal-error': 'An internal error has occurred. Please try again.',
      'auth/too-many-requests': 'We have detected unusual activity on your account. Please try again later.',
      default: 'An error has occurred. Please try again.'
    }
  };
  
  const getMessage = (category, code) => {
    return messages[category][code] || messages[category].default;
  };
  
  export default getMessage;
  