import React, { useState, useContext } from "react";
import { TextField, Button, makeStyles, Grid, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useInputState from "../../../HOOKS/useInputState";
import { AuthContext } from "../../../CONTEXT/AuthContext";
import useHttpClient from "../../../HOOKS/useHttpClient";
import ErrorModal from "../../../USERLOGIN/ErrorModal";
import Spinner from "../../../USERLOGIN/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "220px",
  },
  margin: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  }
}));

const CreateCard = (props) => {
  const auth = useContext(AuthContext);
  const [newList, setnewList] = useState(false);
  const classes = useStyles();
  const [value, changeHandler, reset] = useInputState("");
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();

  const clicked = () => {
    setnewList(true);
  };

  let content = newList ? (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const responseData = await sendRequest(
            "http://localhost:5000/api/cards",
            "POST",
            JSON.stringify({
              header: value,
              kullanici: auth.userId,
            }),
            { "Content-Type": "application/json" }
          );
          reset();
          setnewList(false);
          props.addNewHeader(responseData.card._id, responseData.card.header);
        } catch (err) {
          setnewList(false);
        }
      }}
    >
      <TextField
        autoFocus
        value={value}
        onChange={changeHandler}
        fullWidth
        placeholder="Liste adı"
      />
    </form>
  ) : (
    <Button onClick={clicked} fullWidth size="small" className={classes.margin}>
      <AddIcon style={{ marginRight: 30 }} />
      Yeni Kart Oluştur
    </Button>
  );
  return (
    <React.Fragment>
      <ErrorModal open={open} handleClose={clearError} error={error} />
      <Grid className={classes.root}>
        {isLoading ? <Spinner /> : <Paper>{content} </Paper>}
      </Grid>
    </React.Fragment>
  );
};

export default CreateCard;
