import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import useInputState from "../../../HOOKS/useInputState";
import useHttpClient from "../../../HOOKS/useHttpClient";
import ErrorModal from "../../../USERLOGIN/ErrorModal";
import Spinner from "../../../USERLOGIN/Spinner";

const TodoForm = (props) => {
  const [value, changeHandler, reset] = useInputState("");
  const [helperControl, setHelperControl] = useState(false);
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();

  return isLoading ? 
    <Spinner />
   : 
    <Paper style={{ margin: "1rem 0", padding: "0 1rem" }}>
      <ErrorModal open={open} handleClose={clearError} error={error} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (value !== "") {
            try {
              const responseData = await sendRequest(
                "http://localhost:5000/api/todos",
                "POST",
                JSON.stringify({
                  task: value,
                  mission: props.id,
                }),
                { "Content-Type": "application/json" }
              );
              reset();
              console.log(responseData.todo)
              props.addTodo(
                responseData.todo._id,
                responseData.todo.task,
                responseData.todo.completed
              );
            } catch (err) {}
          } else {
            setHelperControl(true);
            setInterval(() => {
              setHelperControl(false);
            }, 3000);
          }
        }}
      >
        <TextField
          autoFocus
          value={value}
          onChange={changeHandler}
          label="Yeni Görev Ekle"
          margin="normal"
          fullWidth
          helperText={helperControl ? "Hiçbir şey yazmadınız" : null}
        />
      </form>
    </Paper>
};

export default TodoForm;
