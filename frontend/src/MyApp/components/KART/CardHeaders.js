import React, { useState } from "react";
import useStyles from "../../../Navigation/MainNavigationStyle";
import useStyle from "../TODOLIST/TodoAppStyle";
import UseToggleState from "../../../HOOKS/UseToggleState";
import EditTodoForm from "../TODOLIST/EditTodoForm";
import useHttpClient from "../../../HOOKS/useHttpClient";
import ConfirmDeleteModal from "../../../CONTEXT/ConfirmDelete/ConfirmDeleteModal";
import { ListItem, Typography } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CardHeaders = (props) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const Classes = useStyle();
  const [isEditing, toggle] = UseToggleState(false);
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();
  const [isConfirm, setisConfirm] = useState(false);
  const [showRemove, setshowRemove] = useState(false);

  const removeHeader = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/cards/${props.id}`,
        "DELETE"
      );
      props.removeH(props.id);
    } catch (err) {}
  };

  const editHeader = async (Hid, value) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/cards/${Hid}`,
        "PATCH",
        JSON.stringify({
          header: value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.editH(Hid, value);
    } catch (err) {}
  };
  const handleClose = () => {
    setisConfirm(false);
  };

  return (
    <ListItem
      onMouseEnter={() => setshowRemove(true)}
      onMouseLeave={() => setshowRemove(false)}
    >
      {isConfirm && (
        <ConfirmDeleteModal
          spinnerMessage="Kart Siliniiyor..."
          isLoading={isLoading}
          remove={removeHeader}
          handleClose={handleClose}
          message="Kartı silmek istediğinize emin misiniz?"
          open={isConfirm}
        />
      )}
      {isEditing ? (
        <EditTodoForm
          toggleEditForm={toggle}
          task={props.task}
          id={props.id}
          editTodo={editHeader}
        />
      ) : (
        <React.Fragment>
          <Typography
            onClick={toggle}
            className={classes.title}
            variant="overline"
            display="block"
            gutterBottom
          >
            {props.task.length < 25
              ? props.task
              : props.task.substring(0, 24) + "..."}
          </Typography>
            <button
            style={!showRemove && matches ? {display:"none"} : null}
              className="remove-header"
              onClick={() => setisConfirm(true)}
            >
              X
            </button>
        </React.Fragment>
      )}
    </ListItem>
  );
};

export default CardHeaders;
