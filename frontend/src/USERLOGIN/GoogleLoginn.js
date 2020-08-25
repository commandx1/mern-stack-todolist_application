import React from 'react';
import GoogleLogin from "react-google-login";
import "./Google.css";

const GoogleLoginn = props => 
    
    <GoogleLogin
        clientId="your client id"
        render={renderProps => (
          <button 
              className="loginBtn loginBtn--google" 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled}>
                Google ile Giriş Yap
          </button>
        )}
        onSuccess={props.googleRes}
        onFailure={props.googleRes}
        cookiePolicy={'single_host_origin'}
      />
    
export default GoogleLoginn;
