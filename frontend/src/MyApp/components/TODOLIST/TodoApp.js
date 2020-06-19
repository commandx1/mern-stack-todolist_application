import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Grid, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useHttpClient from "../../../HOOKS/useHttpClient";
import Bildirim from "../../Notification/Bildirim";
import TodoBar from "./TodoBar";

const TodoApp = (props) => {
  const [todos, setTodos] = useState([]);
  const { isLoading, error, open, sendRequest, clearError } = useHttpClient();
  const [count, setcount] = useState(0);

  
  const addTodo = (id, task, completed) => {
    const updatedTodos = [
      ...todos,
      { _id: id, task: task, completed: completed },
    ];
    setTodos(updatedTodos);
    setcount(
      updatedTodos.filter((t) => t.completed === true).length *
        (100 / updatedTodos.length)
    );
  };

  const removeT = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo._id !== todoId);
    setTodos(updatedTodos);
    updatedTodos.length > 0
      ? setcount(
          updatedTodos.filter((t) => t.completed === true).length *
            (100 / updatedTodos.length)
        )
      : setcount(0);
  };

  const toggleT = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    setcount(
      updatedTodos.filter((t) => t.completed === true).length *
        (100 / updatedTodos.length)
    );
  };

  const editT = (todoId, newTask) => {
    const updatedTodo = todos.map((todo) =>
      todo._id === todoId ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodo);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/todos/mission/${props.id}`
        );
        setTodos(responseData.todos);
        responseData.todos.length > 0
          ? setcount(
              responseData.todos.filter((t) => t.completed === true).length *
                (100 / responseData.todos.length)
            )
          : setcount(0);
      } catch (err) {}
    };
    fetchTodos();
  }, [sendRequest, props.id]);

  let date = props.isDate ? (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form
        style={{ backgroundColor: "#AE83ED" }}
        onSubmit={(e) => {
          e.preventDefault();
          Bildirim(props.dateTime, props.gorev);
        }}
      >
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Tarih Giriniz"
          format="dd/MM/yyyy"
          minDate={new Date()}
          value={props.dateTime}
          onChange={(date) => {
            props.handleDateChange(props.id, date);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Saat belirleyiniz"
          value={props.dateTime}
          onChange={(date) => {
            props.handleDateChange(props.id, date);
          }}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
        <Button fullWidth color="inherit" type="submit">
          kaydet
        </Button>
      </form>
    </MuiPickersUtilsProvider>
  ) : (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => props.isDateSetter(props.id)}
    >
      Tarih belirlemek ister misiniz?
    </Button>
  );
  return (
    <Scrollbars style={{ height: "80vh"}}>
      <Grid
        container
        justify="center"
        style={{ marginTop: "1rem", height: 300 }}
      >
        <Grid item xs={11} md={8} lg={8}>
          <div style={{ backgroundColor: "white", textAlign: "center" }}>
            {date}
          </div>
          <TodoForm id={props.id} addTodo={addTodo} />

          {!isLoading && todos && (
            <>
              <TodoBar count={count} todos={todos} />
              <TodoList
                header={props.header}
                gorev={props.gorev}
                todos={todos}
                editT={editT}
                removeT={removeT}
                toggleT={toggleT}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Scrollbars>
  );
};

export default TodoApp;
