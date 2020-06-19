import React, { useContext } from "react";
import BackgroudColor from "../components/BackgroundColor";
import { ThemeContext } from "../../CONTEXT/ThemeContext";
import { AuthContext } from "../../CONTEXT/AuthContext";
import useHttpClient from "../../HOOKS/useHttpClient";

const Settings = () => {
  const Theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  let responseData;
  
  const backgroundChangeHandler = async (left, right) => {
    try {
      responseData = await sendRequest(
        `http://localhost:5000/api/users/${auth.userId}/background`,
        "PATCH",
        JSON.stringify({
          left: left,
          right: right,
          imageUrl: null
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
    console.log(responseData);
    console.log(auth.userId);
    Theme.change(left, right);
  };

  const count = [
    { id: 1, left: "948e99", right: "2e1437" },
    { id: 2, left: "d38312", right: "a83279" },
    { id: 3, left: "fdfc47", right: "24fe41" },
    { id: 4, left: "485563", right: "29323c" },
    { id: 5, left: "232526", right: "414345" },
    { id: 6, left: "000000", right: "434343" },
    { id: 7, left: "00bf8f", right: "001510" },
    { id: 8, left: "200122", right: "6f0000" },
    { id: 9, left: "43c6ac", right: "f8ffae" },
  ];

  return (
      count.map(c => (
        <div key={c.id} style={{ display: "inline-block", margin: "20px" }}>
          <BackgroudColor
            backgroundChangeHandler={backgroundChangeHandler}
            left={c.left}
            right={c.right}
          />
        </div>
      ))
  );
};

export default Settings;
