import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MySnackbar from "../../../CONTEXT/Snackbar/MySnackbar";
import PasswordForm from "./PasswordForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);


  const updateShowSnackbar = () => setShowSnackbar(true)

  //Snackbar
  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  //PasswordModal
  const handleOpen = () => {
    setOpenPasswordModal(true);
  };

  const handleClose = () => {
    setOpenPasswordModal(false);
  };

  return (
    <React.Fragment>
      {showSnackbar && (
        <MySnackbar
          autoHideDuration={4000}
          message="Şifreniz başarıyla değiştirildi."
          handleClose={handleCloseBar}
          open={showSnackbar}
        />
      )}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="button"
        onClick={handleOpen}
      >
        Şifre Değiştir
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openPasswordModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPasswordModal}>
          <PasswordForm
            Password={props.Password}
            handleClose={handleClose}
            userId={props.userId}
            name={props.name}
            email={props.email}
            updateShowSnackbar={updateShowSnackbar}
            updatePassword={props.updatePassword}
          />
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
