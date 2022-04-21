import React, {useState} from "react";
import "./App.css";
import {TodoList, TaskType} from "./components/Todolist";
import {v1} from "uuid";


//C - create
//R - read
//U - update
//D - delete

export type FilterValueType = "all" | "active" | "completed"

function App() {


    //DATA (BUSINESS LOGIC)
    const todoListTitle = "What to learn";
    const [tasks, setTasks] = useState<Array<TaskType>>([ //state, setstate(func)
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "TypeScript", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ])

    const removeTasks = (taskID: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID) //filter tasks
        setTasks(filteredTasks) //update state
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
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
                addTask={addTask}

            />
        </div>
    );
}

export default App;
