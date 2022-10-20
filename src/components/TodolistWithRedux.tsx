import React, {ChangeEvent} from "react";
import {FilterValuesType, TasksStateType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodolistType} from "../AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType

}


export function TodolistWithRedux({todolistId, title, filter}: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }


    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "completed"));
    const removeTodolistHandler = () => dispatch(removeTodolistAC(todolistId))
    const addTaskHandler = (title: string) => dispatch(addTaskAC(todolistId, title))
    const changeTaskTitleHandler = (taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    const changeTodolistTitleHandler = (newTitle: string) => dispatch(changeTodolistTitleAC(todolistId, newTitle))


    return <div>
        <h3>
            <EditableSpan title={title} callback={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItemTitle={addTaskHandler}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(todolistId, t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(todolistId, t.id, !t.isDone));
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(newTitle) => changeTaskTitleHandler(t.id, newTitle)}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={onAllClickHandler} variant={filter === "all" ? "outlined" : "contained"}
                        color="secondary" size="small">All</Button>
                <Button onClick={onActiveClickHandler} variant={filter === "active" ? "outlined" : "contained"}
                        color="success" size="small">Active</Button>
                <Button onClick={onCompletedClickHandler} variant={filter === "completed" ? "outlined" : "contained"}
                        color="error" size="small">Completed</Button>
            </ButtonGroup>
        </div>
    </div>
}


