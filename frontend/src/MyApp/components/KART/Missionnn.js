import React, { useState } from "react";
import UseToggleState from "../../../HOOKS/UseToggleState";
import EditTodoForm from "../TODOLIST/EditTodoForm";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "../../../Navigation/MainNavigationStyle";
import Modal from "./Modal";
import useHttpClient from "../../../HOOKS/useHttpClient";
import ConfirmDeleteModal from "../../../CONTEXT/ConfirmDelete/ConfirmDeleteModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./Missionlist.css";

const Mission = (props) => {
  const [isEditing, toggle] = UseToggleState(false);
  const classes = useStyles();
  const { sendRequest, open, error, clearError, isLoading } = useHttpClient();
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);
  const [showIcons, setshowIcons] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  const editMission = async (Mid, value) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/missions/${Mid}`,
        "PATCH",
        JSON.stringify({
          name: value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.editM(Mid, value);
    } catch (err) {}
  };

  const removeMission = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/missions/${props.id}`,
        "DELETE"
      );
      props.removeM(props.id);
    } catch (err) {}
  };

  const handleClose = () => setshowConfirmDelete(false);

  const style = {
    left: "0px",
    resize: "none",
    width: "70%",
    borderRadius: "10px",
  };

  return (
    <React.Fragment>
      {showConfirmDelete && (
        <ConfirmDeleteModal
          isLoading={isLoading}
          remove={removeMission}
          handleClose={handleClose}
          message={props.task + " isimli görev listenizi kaldırmak istediğinize emin misiniz?"}
          spinnerMessage="Görev siliniyor..."
          open={showConfirmDelete}
        />
      )}
      <ListItem>
        {isEditing ? (
          <EditTodoForm
            toggleEditForm={toggle}
            task={props.task}
            id={props.id}
            editTodo={editMission}
          />
        ) : (
          <>
            <ListItemText
              onMouseEnter={() => setshowIcons(true)}
              onMouseLeave={() => setshowIcons(false)}
            >
              <Modal
                className={classes.title}
                header={props.header}
                gorev={props.task}
                id={props.id}
                dateTime={props.dateTime}
                DateSetter={props.DateSetter}
                dateChangeHandler={props.dateChangeHandler}
                isDate={props.isDate}
                style={style}
                showIcons={showIcons}
              />
              <ListItemSecondaryAction
                className={
                  showIcons || !matches
                    ? "missionlist-icons"
                    : "missionlist-icons-unvisible"
                }
                id="Secondary-Action"
              >
                <IconButton onClick={toggle}>
                  <EditIcon id="Edit" />
                </IconButton>
                <IconButton onClick={() => setshowConfirmDelete(true)}>
                  <DeleteIcon id="Delete" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemText>
          </>
        )}
      </ListItem>
    </React.Fragment>
  );
};

export default Mission;
