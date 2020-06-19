import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import Spinner from "../../USERLOGIN/Spinner";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    background: "#ef32d9",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to right, #89fffd, #ef32d9)",  /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to right, #89fffd, #ef32d9)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6, 8, 6),
    paddingBottom: theme.spacing(5),
    borderRadius:"30px"
  },
  button: {
    borderRadius: "35%",
    marginRight: theme.spacing(4)
  },
  buttons: {
    textAlign: "center"
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            {props.isLoading ? 
              <Spinner spinnerMessage={props.spinnerMessage} />
             : 
              <div className={classes.buttons}>
                <h2 id="transition-modal-title">{props.message}</h2>
                <Button
                  onClick={props.remove}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  EVET
                </Button>
                <Button
                  onClick={props.handleClose}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  HAYIR
                </Button>
              </div>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
