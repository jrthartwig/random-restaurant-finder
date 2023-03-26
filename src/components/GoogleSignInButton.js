import React, { useEffect, useRef } from "react";

const GoogleSignInButton = ({ clientId, onSuccess, onFailure }) => {
  const buttonRef = useRef();

  const handleCredentialResponse = (response) => {
    // Add your logic to handle the response, e.g., parse the JWT token and log in the user
    if (response && response.credential) {
      onSuccess(response);
    } else {
      onFailure(response);
    }
  };

  useEffect(() => {
    if (!window.google) {
      console.error("Google SDK not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
    });

    // Clean up the button on component unmount
    return () => {
      buttonRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={buttonRef}></div>;
};

export default GoogleSignInButton;
