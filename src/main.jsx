import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="cgcmstudio.eu.auth0.com"
    clientId="2NuEXJLfSSAJxH8luvfDqFyHppCEjWYr"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)
