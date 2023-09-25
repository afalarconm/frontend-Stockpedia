import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-p1hsd7pae7fdnccq.us.auth0.com"
      clientId="CLlKoQTg5nY43McMoFacylzw1yr91Jsj"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://stockpedia-api",
        // scope: "read:current_user update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
