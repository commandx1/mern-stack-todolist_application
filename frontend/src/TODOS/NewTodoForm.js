import React, { Component } from 'react';
import uuid from "uuid/v4";
import "./NewTodoForm.css"

export default class NewTodoForm extends Component {
    constructor(props){
    super(props);
    this.state = { task: ""};
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    }
    changeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler(event){
        event.preventDefault();
        this.props.createTodo({...this.state, id: uuid(), completed: false});
        this.setState({task:""});
    }
    
    render() {
        return (
            <form className="new-todo-form" onSubmit={this.submitHandler}>
                <label htmlFor="task"> Yeni Görev</label>
                <input type="text"
                value={this.state.task}
                name="task"
                onChange={this.changeHandler} id="task" placeholder="Görev giriniz..." />
            <button type="submit">Ekle</button>
            </form>
        )
    }
}
