import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useInputState from "../../../HOOKS/useInputState";
import useHttpClient from "../../../HOOKS/useHttpClient";
import ErrorModal from "../../../USERLOGIN/ErrorModal";
import Spinner from "../../../USERLOGIN/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      background: "transparent",
    },
  },
  div: {
    display: "flex",
  },
}));

const CreateMissionList = (props) => {
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
            "http://localhost:5000/api/missions",
            "POST",
            JSON.stringify({
              name: value,
              card: props.headerId,
            }),
            { "Content-Type": "application/json" }
          );
          reset();
          setnewList(false);
          props.addNewMissionList(responseData.mission._id, responseData.mission.name);
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
      ></TextField>
    </form>
  ) : (
    <Button onClick={clicked} fullWidth>
      <div className={classes.div}>
        <AddIcon />
        <Typography>Görev Listesi Ekle</Typography>
      </div>
    </Button>
  );
  return (
    <React.Fragment>
      <ErrorModal open={open} handleClose={clearError} error={error} />
      {isLoading ? <Spinner/> : content}
    </React.Fragment>
  );
};

export default CreateMissionList;
