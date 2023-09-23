import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Recibir = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-p1hsd7pae7fdnccq.us.auth0.com";
  
      try {
        const token = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        setAccessToken(token);  // Set the access token
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    if (isAuthenticated) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, isAuthenticated, user?.sub]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        <h3>Access Token: {accessToken}</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Recibir;
