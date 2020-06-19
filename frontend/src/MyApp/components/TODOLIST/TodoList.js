import React from 'react';
import Todo from "./Todo";
import { 
    Typography,
    Paper,
    List,
    Divider,
} from '@material-ui/core';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

const TodoList = props => {
    return (
        <Paper style={{backgroundColor:"gray"}}>
            <Typography variant="subtitle1" align="center" color="primary">{props.header.length < 45
              ? props.header
              : props.header.substring(0, 44) + "..."} <ArrowForwardOutlinedIcon/> {props.gorev.length < 30
                ? props.gorev
                : props.gorev.substring(0, 43) + "..."} <br/> Görevlerim: </Typography>
            <List>
            {props.todos.map((todo, i) => (
               <div key={todo._id}>
                <Todo 
                    id={todo._id}
                    task={todo.task} 
                    completed={todo.completed}
                    editT={props.editT}
                    removeT={props.removeT}
                    toggleT={props.toggleT}
                />
                {i < props.todos.length - 1 && <Divider/>}
                </div>
           ))}
            </List>
        </Paper>
    )
}

export default TodoList
