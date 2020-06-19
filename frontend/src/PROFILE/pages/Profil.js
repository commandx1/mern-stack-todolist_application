import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../../HOOKS/useHttpClient";
import PasswordModal from "../components/Password/PasswordModal";
import ErrorModal from "../../USERLOGIN/ErrorModal";
import Spinner from "../../USERLOGIN/Spinner";
import "../components/Profil.css";
import UpdateForm from "../components/UserInfo/UpdateForm";

const Profil = () => {
  const userId = useParams().userId;
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();
  const [user, setuser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    firstLetter: "",
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );
        setuser({
          id: responseData.user._id,
          name: responseData.user.name,
          imageUrl: responseData.user.image,
          password: responseData.user.password,
          email: responseData.user.email,
          firstLetter: responseData.user.name.charAt(0).toUpperCase(),
        });
      } catch (err) {}
    };

    fetchCards();
  }, [sendRequest, userId]);

  const updatePassword = (newPass) => setuser({ ...user, password: newPass });
  const changeName = (e) => {
    setuser({ ...user, name: e.target.value });
  };
  const changeEmail = (e) => {
    setuser({ ...user, email: e.target.value });
  };

  return isLoading ? (
    <Spinner asOverlay />
  ) : (
    <div className="card">
      <ErrorModal open={open} error={error} handleClose={clearError} />
      <UpdateForm
        changeEmail={changeEmail}
        changeName={changeName}
        name={user.name}
        firstLetter={user.firstLetter}
        user={user}
        email={user.email}
        isLoad={isLoading}
        userId={userId}
        imageUrl={user.imageUrl}
      />
      <PasswordModal
        updatePassword={updatePassword}
        name={user.name}
        email={user.email}
        userId={userId}
        Password={user.password}
      />
    </div>
  );
};

export default Profil;
