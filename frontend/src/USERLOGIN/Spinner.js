import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
        <div className="lds-dual-ring">{props.spinnerMessage}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
