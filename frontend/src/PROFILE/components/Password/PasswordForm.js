import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import useHttpClient from "../../../HOOKS/useHttpClient";
import ErrorModal from "../../../USERLOGIN/ErrorModal";
import Spinner from "../../../USERLOGIN/Spinner";
import Password from "./Password";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "70px 30px",
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    width: theme.spacing(50),
    color: "#230252",
    background: "#a8c0ff" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #3f2b96, #a8c0ff)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #3f2b96, #a8c0ff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  },
  button: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: theme.spacing(10),
  },
}));

const PasswordForm = (props) => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, clearError, open } = useHttpClient();
  const currentPassword = document.getElementsByClassName("currentPassword");
  const newPassword = document.getElementsByClassName("newPassword");
  const newPasswordAgain = document.getElementsByClassName("newPasswordAgain");

  const [passwords, setpasswords] = useState([
    {
      id: 1,
      password: "",
      passwordName: "Mevcut Şifre",
      anchorEl: null,
      className: "currentPassword",
      popoverName: "simple-popover",
      message: "Mevcut Şifre Hatalı !",
    },
    {
      id: 2,
      password: "",
      passwordName: "Yeni Şifre",
      anchorEl: null,
      className: "newPassword",
      popoverName: "simple-popover2",
      message: "Şifre en az Altı Haneli Olmalı !",
    },
    {
      id: 3,
      password: "",
      passwordName: "Yeni Şifre Tekrar",
      anchorEl: null,
      className: "newPasswordAgain",
      popoverName: "simple-popover3",
      message: "Şifreler Uyuşmuyor !",
    },
  ]);

  //POPOVERS
  const handleClick = (pid, pname) => {
    const updatedPasswords = passwords.map((p) =>
      p.id === pid ? { ...p, anchorEl: pname[0] } : p
    );
    console.log(pname[0]);
    setpasswords(updatedPasswords);
  };

  const handleClosePopover = (pid) => {
    const updatedPasswords = passwords.map((p) =>
      p.id === pid ? { ...p, anchorEl: null } : p
    );
    setpasswords(updatedPasswords);
  };

  const passwordChangeHandler = (pid, e) => {
    const u = passwords.map((p) =>
      p.id === pid ? { ...p, password: e.target.value } : p
    );
    setpasswords(u);
  };

  const resetPassword = () => {
    const updatedPassword = passwords.map((p) =>
    p.id ? { ...p, password: "" } : p
    );
    setpasswords(updatedPassword);
  }

  return (
    <React.Fragment>
      <ErrorModal open={open} handleClose={clearError} error={error} />
      <form
        className={classes.paper}
        onSubmit={async (e) => {
          e.preventDefault();
          if (passwords[0].password === props.Password) {
            if (passwords[1].password.length > 5) {
              if (passwords[1].password === passwords[2].password) {
                try {
                  await sendRequest(
                    `http://localhost:5000/api/users/${props.userId}`,
                    "PATCH",
                    JSON.stringify({
                      password: passwords[1].password,
                      email: props.email,
                      name: props.name,
                    }),
                    {
                      "Content-Type": "application/json",
                    }
                  );
                props.handleClose();
                resetPassword();
                props.updateShowSnackbar();
                props.updatePassword(passwords[1].password);
                } catch (err) {}
              } else {
                handleClick(3, newPasswordAgain);
              }
            } else {
              handleClick(2, newPassword);
            }
          } else {
            handleClick(1, currentPassword);
          }
        }}
      >
        <h2>Şifre Değişikliği</h2>
        {isLoading && <Spinner asOverlay />}
        {passwords.map((p) => (
          <Password
            key={p.id}
            password={p.password}
            anchorEl={p.anchorEl}
            className={p.className}
            popoverName={p.popoverName}
            passwordName={p.passwordName}
            handleClosePopover={handleClosePopover}
            pid={p.id}
            popoverMessage={p.message}
            passwordChangeHandler={passwordChangeHandler}
          />
        ))}
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Kaydet
        </Button>
        <Button
          className={classes.button}
          onClick={props.handleClose}
          variant="contained"
          color="secondary"
        >
          İptal
        </Button>
      </form>
    </React.Fragment>
  );
};

export default PasswordForm;
