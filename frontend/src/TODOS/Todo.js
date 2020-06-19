import React,{Component} from 'react';
import "./Todo.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            task: this.props.task
        };
        this.removeHandler = this.removeHandler.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.toggleHandler = this.toggleHandler.bind(this);
    }
    removeHandler() {
        this.props.removeTodo(this.props.id);
    }
    toggleForm(){
        this.setState({isEditing: !this.state.isEditing});
    }

    updateHandler(event){
        event.preventDefault();
        this.props.updateTodo(this.props.id, this.state.task);
        this.setState({isEditing:false});

    }
    changeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    toggleHandler(event){
        this.props.toggleTodo(this.props.id);
    }
    render(){
        let result;
    if(this.state.isEditing){
        result = (
            <div className="Todo">
                <form className="Todo-edit-form" onSubmit = {this.updateHandler}>
                    <input 
                    type="text" 
                    value={this.state.task}
                    name="task" 
                    onChange={this.changeHandler} />
                    <button type="submit">Kaydet</button>
                </form>
            </div>
        )
    } else {
        result = (
            <div className="Todo">
            <li className={this.props.completed ? "Todo-task completed" : "Todo-task"}
            onClick={this.toggleHandler} >
                {this.props.task}
                </li>
                <div className="Todo-buttons">
                <button onClick={this.toggleForm}><EditIcon/></button>
                <button onClick={this.removeHandler}><DeleteIcon/></button>
                </div>
            </div>
        );

    }
    
    return (result);
     
    
}
}

