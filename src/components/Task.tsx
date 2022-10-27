import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React from "react";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    isDone: boolean
}


export const Task = React.memo(({todolistId, taskId, title, isDone}: TaskPropsType) => {
    console.log("task")
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(todolistId, taskId))

    const onChangeHandler = () => {
        dispatch(changeTaskStatusAC(todolistId, taskId, !isDone));
    }
    const changeTaskTitleHandler = (taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))


    return <li className={isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeHandler}
            color='primary'
            checked={isDone}/>

        <EditableSpan title={title} callback={(newTitle) => changeTaskTitleHandler(taskId, newTitle)}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})

