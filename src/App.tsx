import React from 'react';
import './App.css';
import {TodoList, TaskType} from "./components/Todolist";


function App() {
    const listTitle1 = "What to learn";
    const listTitle2 = 'What to buy';
    const listTitle3 = 'Whats to do'

    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: "Eggs", isDone: true},
        {id: 2, title: "Sugar", isDone: true},
        {id: 3, title: "Water", isDone: true},
    ]
    const tasks3: Array<TaskType> = [
        {id: 1, title: "Eat", isDone: true},
        {id: 2, title: "Work", isDone: true},
        {id: 3, title: "Sleep", isDone: false},
    ]


    return (
        <div className="App">
            <TodoList title={listTitle1} tasks={tasks1}/>
            <TodoList title={listTitle2} tasks={tasks2}/>
            <TodoList title={listTitle3} tasks={tasks3}/>
        </div>
    );
}

export default App;
