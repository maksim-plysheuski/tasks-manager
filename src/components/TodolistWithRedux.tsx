import React, {useCallback} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {addTaskAC} from "../state/tasks-reducer";
import {Task} from "./Task";

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

export const TodolistWithRedux = React.memo(({todolistId, title, filter}: PropsType) => {
    console.log("list")
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
    const addTaskHandler = useCallback((title: string) => dispatch(addTaskAC(todolistId, title)), [dispatch, todolistId])
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
                tasks.map(t => <Task key={t.id} todolistId={todolistId} taskId={t.id} title={t.title} isDone={t.isDone} />)
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
})


