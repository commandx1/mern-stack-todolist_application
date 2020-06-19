import React, { useState, useCallback, useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { AuthContext } from "./AuthContext";
import { makeStyles } from "@material-ui/core";
import useHttpClient from "../HOOKS/useHttpClient";

const PageContent = (props) => {
  
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [colors, setColors] = useState([{ left: "", right: "", url: "" }]);
  const useStyles = makeStyles(() => ({
    root: {
      background: `#${colors[0].right}` /* fallback for old browsers */,
      background: `-webkit-linear-gradient(to right, #${colors[0].left}, #${colors[0].right})` /* Chrome 10-25, Safari 5.1-6 */,
      background: `linear-gradient(to right, #${colors[0].left}, #${colors[0].right})` /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      width: "auto",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }));

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userId}`
        );
        setColors([
          {
            left: responseData.user.background.left,
            right: responseData.user.background.right,
            url: responseData.user.background.imageUrl,
          },
        ]);
      } catch (err) {}
    };

    fetchBackground();
  }, [sendRequest, auth.userId]);

  const classes = useStyles();

  const change = useCallback((left, right) => {
    setColors([{ ...colors, left: left, right: right, url: "" }]);
  }, []);

  const changeImage = useCallback((url) => {
    setColors([{ ...colors, url: url }]);
  }, []);

  return (
    <ThemeContext.Provider value={{ change: change, changeImage: changeImage }}>
      <div
        style={
          colors[0].url
            ? {
                backgroundImage: `url(${colors[0].url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
              }
            : null
        }
        className={classes.root}
      >
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export default PageContent;
