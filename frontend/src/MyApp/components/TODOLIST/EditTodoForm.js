import React from "react";
import useInputState from "../../../HOOKS/useInputState";
import {
  TextareaAutosize,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DoneAllSharpIcon from "@material-ui/icons/DoneAllSharp";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./TodoAppStyle";

const EditTodoForm = (props) => {
  const [value, changeHandler, reset] = useInputState(props.task);
  const classes = useStyles();

  return (
    <ListItemText>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.editTodo(props.id, value);
          reset();
          props.toggleEditForm();
        }}
        className={classes.form}
      >
        <TextareaAutosize
          style={{
            color: props.color,
            fontSize: props.fontSize
          }}
          value={value}
          onChange={changeHandler}
          autoFocus
          className={classes.textArea}
        />
        <ListItemSecondaryAction id="Secondary-Action">
          <IconButton type="submit">
            <DoneAllSharpIcon color="primary" />
          </IconButton>
        </ListItemSecondaryAction>
      </form>
    </ListItemText>
  );
};

export default EditTodoForm;
