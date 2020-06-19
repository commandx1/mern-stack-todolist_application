import React, { Component } from 'react';
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./Todolist.css";


export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = { 
            todos: [] 
        }
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }
    create(newTodo){
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }
    remove(id){
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        });
    }
    update(id,updatedTask){
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, task: updatedTask};
            }
            return todo;
        });
        this.setState({ todos: updatedTodos });
    }
    toggleCompletion(id){
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, completed: !todo.completed};
            }
            return todo;
        });
        this.setState({ todos: updatedTodos });
    }
    

    render() {
        const todo = this.state.todos.map(todo => {
            return <Todo
            id={todo.id} 
            removeTodo={this.remove} 
            updateTodo={this.update}
            completed={todo.completed}
            toggleTodo={this.toggleCompletion}
            key={todo.id} 
            task={todo.task} />
        })
        return (
            <div className="todolisttt">
           <h1>Yapılacaklar Listesi<span>Görevlerim...</span></h1>
           
           <ul>
                {todo}
           </ul>
           <NewTodoForm createTodo={this.create}/>
           </div>
        );
    }
}
