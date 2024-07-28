// src/auth.js
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export const monitorAuthState = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (user.emailVerified) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          isVerified: true,
          verificationDate: new Date().toISOString(),
        });
      }
    }
  });
};
