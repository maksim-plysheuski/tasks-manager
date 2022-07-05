import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, NewIsDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (todoListID: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
}

function DeleteIcon() {
    return null;
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const removeTodolistHandler = () => {
        props.removeTodoList(props.id)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }
    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        props.changeTaskTitle(props.id, taskId, newTitle)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} callback={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItemTitle={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
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
            <Button onClick={onAllClickHandler} variant={props.filter === "all" ? "outlined" : "contained"} color="secondary" size="small">All</Button>
            <Button onClick={onActiveClickHandler} variant={props.filter === "active" ? "outlined" : "contained"} color="success" size="small" >Active</Button>
            <Button onClick={onCompletedClickHandler} variant={props.filter === "completed" ? "outlined" : "contained"} color="error" size="small">Completed</Button>


        </div>
    </div>
}


