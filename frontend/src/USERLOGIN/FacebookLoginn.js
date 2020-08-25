import React from 'react';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./Facebook.css";

const FacebookLoginn = props =>
  
     <FacebookLogin
      appId="your app id"
      fields="name,email,picture"
      render={renderProps => (
          <button 
               className="FloginBtn FloginBtn--facebook" 
               onClick={renderProps.onClick}>
                    Facebook ile Giriş Yap
          </button>
        )}
      callback={props.faceResponse} 
     />
    


export default FacebookLoginn;
