import React from "react";
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
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./components/TodolistWithRedux";

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

    let todoLists = useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    /*function removeTask(todoListID: string, id: string) {
        dispatch(removeTaskAC(todoListID, id))
    }*/

   /* function addTask(todoListID: string, title: string) {
        dispatch(addTaskAC(todoListID, title))
    }*/

    function changeStatus(todoListID: string, taskId: string, newIsDone: boolean) {
        dispatch(changeTaskStatusAC(todoListID, taskId, newIsDone))
    }

    function changeTaskTitle(todoListID: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todoListID, taskId, newTitle))
    }

   /* function removeTodoList(todoListID: string) {
        let action = removeTodolistAC(todoListID)
        dispatch(action)
    }*/

    /*function changeFilter(todoListID: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todoListID, value))
    }*/

    function addNewTodolist(newTitle: string) {
        let action = addTodolistAC(newTitle)
        dispatch(action)
    }


    /*function changeTodolistTitle(todoListID: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todoListID, newTitle))
    }*/


    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItemTitle={addNewTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el) => {
                       /* let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }*/

                        return <Grid key={el.id} item>
                            <Paper style={{padding: "10px"}}>
                                <TodolistWithRedux
                                    todolistId={el.id}
                                    title={el.title}
                                    filter={el.filter}
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
