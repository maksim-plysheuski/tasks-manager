import React, {FC, useState} from "react";
import {FilterValueType} from "../App";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTasks: (tasksID: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const onClickAddTask = () => props.addTask(title)
    const taskListItems = props.tasks.map(t => {
        const onClickRemoveTask = () => props.removeTasks(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickRemoveTask}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}
