import React from 'react';
import GoogleLogin from "react-google-login";
import "./Google.css";

const GoogleLoginn = props => 
    
    <GoogleLogin
        clientId="889707061319-299ss05a42f99c2g4v6hllcd4bsnir2p.apps.googleusercontent.com"
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
