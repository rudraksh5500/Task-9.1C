import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './SignOut.css'; // Import the CSS file

const SignOut = () => {
  const navigate = useNavigate();
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      // Check if the user is already signed out
      const user = firebase.auth().currentUser;
      if (!user) {
        setIsSignedOut(true);
        navigate('/');
      }
    }

    checkAuthState();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isSignedOut) {
    return null; // Don't render anything if the user is already signed out
  }

  return (
    <div className="signout-container">
      <div className="center-content">
        <h1 className="signout-heading">Sign Out</h1>
        <p>Click the button below to sign out:</p>
        <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default SignOut;
