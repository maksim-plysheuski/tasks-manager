import React, {useReducer} from "react";
import "./App.css";
import {Todolist, TaskType} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todoLists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "Whats to learn", filter: "all"},
        {id: todolistID2, title: "Whats to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
        dispatchToTasksReducer(removeTaskAC(todoListID, id))
    }

    function addTask(todoListID: string, title: string) {
        dispatchToTasksReducer(addTaskAC(todoListID, title))
    }

    function changeStatus(todoListID: string, taskId: string, newIsDone: boolean) {
        dispatchToTasksReducer(changeTaskStatusAC(todoListID, taskId, newIsDone))
    }

    function changeTaskTitle(todoListID: string, taskId: string, newTitle: string) {
        dispatchToTasksReducer(changeTaskTitleAC(todoListID, taskId, newTitle))
    }

    function removeTodoList(todoListID: string) {
        let action = removeTodolistAC(todoListID)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        dispatchToTodolistReducer(changeTodolistFilterAC(todoListID, value))
    }

    function addNewTodolist(newTitle: string) {
        let action = addTodolistAC(newTitle)
        dispatchToTasksReducer(action)
        dispatchToTodolistReducer(action)
    }


    function changeTodolistTitle(todoListID: string, newTitle: string) {
        dispatchToTodolistReducer(changeTodolistTitleAC(todoListID, newTitle))
    }


    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItemTitle={addNewTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el) => {
                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
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
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>


        </div>
    );
}

export default App;
