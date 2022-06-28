import React, {useState} from "react";
import "./App.css";
import {Todolist, TaskType} from "./components/Todolist";
import {v1} from "uuid";
import {InputComponent} from "./components/Input";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: "Whats to learn", filter: "all"},
        {id: todolistID2, title: "Whats to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(e => e.id !== id)})
    }
    function changeStatus(todoListID: string, taskId: string, NewIsDone: boolean) {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(e => e.id
            === taskId ? {...e, isDone: NewIsDone} : e)
        })
    }
    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(e => e.id === todoListID ? {...e, filter: value} : e))
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(e => e.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }
    function addTask(todoListID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})
    }

    function addTodoList (newTitle: string) {
        let newTodoListId = v1();
        let newTodoList: TodoListsType = {id: newTodoListId, title: newTitle, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    return (
        <div className="App">
            <InputComponent callBack={addTodoList}/>
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
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
