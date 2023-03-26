import React, { useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const clientId =
    "619270359266-qh2rq3gjvctvtq6b4se6anlk744ar4t1.apps.googleusercontent.com"; // Replace with your Google Client ID

  const onSuccess = (response) => {
    setLoggedIn(true);
    setUserProfile(response.profileObj);
    console.log("Login success", response);
  };

  const onFailure = (response) => {
    console.log("Login failed", response);
  };

  const onLogoutSuccess = () => {
    setLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <div>
      <h1>Foodie Roulette</h1>
      {loggedIn && userProfile ? (
        <div>
          <p>Welcome, {userProfile.name}!</p>
          <button onClick={onLogoutSuccess}>Logout</button>
        </div>
      ) : (
        <GoogleSignInButton
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      )}
    </div>
  );
};

export default Header;
