import React, { useState } from "react";
import useHttpClient from "../../../HOOKS/useHttpClient";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ErrorModal from "../../../USERLOGIN/ErrorModal";
import Spinner from "../../../USERLOGIN/Spinner";
import "../Profil.css";
import MySnackbar from "../../../CONTEXT/Snackbar/MySnackbar";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    abc: { margin: "2% 0", color: "black", fontSize: "2.5em" },
  })
);

const UpdateForm = (props) => {
  const classes = useStyles();
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };
  let responseData;

  const inputStyle = { margin: "2% 0", color: "black" };
  return (
    <React.Fragment>
      <MySnackbar
        autoHideDuration={4000}
        message="Değişiklikler başarıyla kaydedildi"
        handleClose={handleClose}
        open={showSnackbar}
      />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            responseData = await sendRequest(
              `http://localhost:5000/api/users/${props.userId}`,
              "PATCH",
              JSON.stringify({
                name: props.name,
                email: props.email,
              }),
              {
                "Content-Type": "application/json",
              }
            );
            setShowSnackbar(true);
          } catch (err) {}
        }}
      >
        <ErrorModal open={open} error={error} handleClose={clearError} />
        {isLoading && <Spinner asOverlay />}
        {!props.isLoad && props.user && (
          <div>
            {props.imageUrl ? (
              <img src={props.imageUrl} />
            ) : (
              <h1>{props.firstLetter}</h1>
            )}
            <br />
            <Textfield
              className="input"
              className="abc"
              value={props.email}
              fullWidth
              onChange={(e) => props.changeEmail(e)}
            />
            <Textfield
              className="input"
              className="abc"
              value={props.name}
              fullWidth
              onChange={(e) => props.changeName(e)}
            />
            <Button
              style={{ marginTop: "2%" }}
              disabled={props.name ? false : true}
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              kaydet
            </Button>
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default UpdateForm;
