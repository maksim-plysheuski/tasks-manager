import React, {FC, useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (tasksID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, status: boolean) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onClickAddTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Field is required')
        }
    }


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") onClickAddTask()
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }



    const taskListItems = props.tasks.map(t => {
        const onClickRemoveTask = () => props.removeTask(t.id)
        const onChangeStatusCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }

        return (
            <li key={t.id}>
                <input onChange={onChangeStatusCheckbox} type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={onClickRemoveTask}>X</button>

            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ""} value={title} onChange={onChangeSetTitle} onKeyPress={onKeyPressAddTask}/>
                <button onClick={onClickAddTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button onClick={changeFilter("all")}>All</button>
                <button onClick={changeFilter("active")}>Active</button>
                <button onClick={changeFilter("completed")}>Completed
                </button>
            </div>
        </div>
    )
}
