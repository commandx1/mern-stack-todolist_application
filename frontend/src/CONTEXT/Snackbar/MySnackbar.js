import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  alert: {
    fontSize: "1.1em",
  },
}));

export default function MySnackbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
      >
        <Alert
          className={classes.alert}
          onClose={props.handleClose}
          severity="success"
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
