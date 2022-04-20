import React, {useState} from "react";
import "./App.css";
import {TodoList, TaskType} from "./components/Todolist";


//C - create
//R - read
//U - update
//D - delete

export type FilterValueType = "all" | "active" | "completed"

function App() {

    //DATA (BUSINESS LOGIC)
    const todoListTitle = "What to learn";
    const [tasks, setTasks] = useState<Array<TaskType>>([ //state, setstate(func)
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JavaScript", isDone: true},
        {id: 3, title: "TypeScript", isDone: false},
        {id: 4, title: "React", isDone: false},
    ])

    const removeTasks = (taskID: number) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID) //filter tasks
        setTasks(filteredTasks) //update state
    }

    const [filter, setFilter] = useState<FilterValueType>("all")

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
        console.log(filter)
    }


//UI:
    let tasksForRender;
    switch (filter) {
        case "active":
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone)
            break
        default:
            tasksForRender = tasks
    }


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
