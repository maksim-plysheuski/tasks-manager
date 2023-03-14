import React, {useCallback, useEffect} from "react"
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Menu } from '@mui/icons-material';
import {
    addTodolistAC,
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC,
    FilterValuesType,
    getTodosTC,
    removeTodolistTC, setTodolistsAC,
    TodolistDomainType
} from "./state/todolists-reducer"
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTasksTC, updateTaskTC
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from 'react-redux';
import {AppRootStateType, useAppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./api/todolists-api"
import { AddItemForm } from './components/AddItemForm';
import { Todolist } from './components/Todolist';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    useEffect(() => {
        dispatch(getTodosTC())
    }, [])

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch(); //custom hook

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTasksTC(todolistId, id))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title));
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(todolistId, id, status))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title))
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
