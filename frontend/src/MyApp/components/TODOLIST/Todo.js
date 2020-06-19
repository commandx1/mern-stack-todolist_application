import React, { useState } from "react";
import UseToggleState from "../../../HOOKS/UseToggleState";
import EditTodoForm from "./EditTodoForm";
import useHttpClient from "../../../HOOKS/useHttpClient";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import ConfirmDeleteModal from "../../../CONTEXT/ConfirmDelete/ConfirmDeleteModal";

const Todo = (props) => {
  const [isEditing, toggle] = UseToggleState(false);
  const { sendRequest, isLoading } = useHttpClient();
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);

  const editTodo = async (Tid, value) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/todos/${Tid}`,
        "PATCH",
        JSON.stringify({
          task: value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.editT(Tid, value);
    } catch (err) {}
  };

  const removeTodo = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/todos/${props.id}`,
        "DELETE"
      );
      props.removeT(props.id);
    } catch (err) {}
  };

  const toggleTodo = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/todos/c/${props.id}`,
        "PATCH"
      );
      props.toggleT(props.id);
    } catch (err) {}
  };

  const handleClose = () => setshowConfirmDelete(false);
  return (
    <ListItem style={{ height: "64px" }}>
      {showConfirmDelete && (
        <ConfirmDeleteModal
          spinnerMessage="Görev siliniyor..."
          isLoading={isLoading}
          remove={removeTodo}
          handleClose={handleClose}
          message="Görevi silmek istediğinize emin misiniz?"
          open={showConfirmDelete}
        />
      )}
      <Checkbox
        onClick={() => toggleTodo(props.id)}
        tabIndex={-1}
        checked={props.completed}
        color="primary"
      />
      {isEditing ? (
        <EditTodoForm
          toggleEditForm={toggle}
          task={props.task}
          id={props.id}
          editTodo={editTodo}
          color = "#045B08"
          fontSize = "1rem"
        />
      ) : (
        <React.Fragment>
          <ListItemText className={props.completed ? "Todo-task completed" : "Todo-task"} >
            {props.task.length < 60
              ? props.task
              : props.task.substring(0, 59) + "..."}
          </ListItemText>
          <ListItemSecondaryAction>
            <Edit id="edit-todo" onClick={toggle} color="error" />
            <Delete
              id="delete-todo"
              onClick={() => setshowConfirmDelete(true)}
              color="secondary"
            />
          </ListItemSecondaryAction>
        </React.Fragment>
      )}
    </ListItem>
  );
};

export default Todo;
