import React, { useState } from 'react';
import './Todo.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';

function AddTodoForm({ addTodo }) {
    const [value, setValue] = useState("");

    const handleChange = e => {
        e.preventDefault();
        if(!value) return;
        addTodo(value, false);
        setValue("");
    }

    return (
            <Form onSubmit = {handleChange}>
                <Form.Row>
                    <Col>
                        <Form.Control type = "text" value = {value} onChange = {e => setValue(e.target.value)} placeholder = "Enter new item to TODO list"/>
                    </Col>
                    <Button variant="primary" size = "sm" type = "submit">Add new Todo</Button>
                </Form.Row>
            </Form>
    )
}



export function Todo()
{
    const [todos, setTodos] = useState([] || JSON.parse(localStorage.getItem("todos_json")));

    window.onload = function() {
        const todos = JSON.parse(localStorage.getItem("todos_json"));
        if(todos) {
            setTodos(todos);
        }
    }

    const addTodo = (title, isCompleted) => {
        const newTodos = [...todos, { title, isCompleted }];
        setTodos(newTodos);
        localStorage.setItem("todos_json", JSON.stringify(newTodos));
        console.log(todos);
    }

    const completedTodo = (id) => {
        const newTodos = [...todos];
        newTodos[id].isCompleted = true;
        setTodos(newTodos);
        console.log(todos);

    }

    return (
        <div id = "todo">
            <div className = 'col-sm-12 col-md-6 mx-auto mt-5'>
                <div className = 'todo-list'>
                    {todos.map((todo, index) => 
                        <Card key = {index} className = "mt-2">
                            <Card.Body><Row><Form.Check  className = "mx-3" disabled = {todo.isCompleted ? true : false} onClick = {() => completedTodo(index)}></Form.Check><p className = "my-auto" style = {{ textDecoration: todo.isCompleted ? "line-through" : ""}}>{todo.title}</p></Row></Card.Body>
                        </Card>)}
                </div>
            </div>
                <div className = 'col-sm-8 col-md-6 mx-auto mt-3'>
                    <AddTodoForm addTodo = {addTodo}></AddTodoForm>
                </div>
            </div>
    );
}