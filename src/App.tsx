import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: "Whats to learn", filter: "all"},
        {id: todolistID2, title: "Whats to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Oil", isDone: false},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Eggs", isDone: true},]
    });


    function removeTask(id: string, todoListID: string) {
        let removedTasks = tasks[todoListID].filter(el => el.id !== id)
        setTasks({...tasks, [todoListID]: removedTasks})
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})

    }

    function changeStatus(taskId: string, isDone: boolean) {
        /*let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);*/
    }


    function changeFilter(value: FilterValuesType) {
        /*setFilter(value);*/
    }

    return (
        <div className="App">

            {todoLists.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
