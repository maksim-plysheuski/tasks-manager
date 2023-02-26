import React, {useEffect, useState} from "react"
import {ResponseType, todolistsAPI} from "../api/todolists-api"
import {AxiosResponse} from "axios";



export default {
    title: "API"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((response) => setState(response.data))
    }, [])
    return <div>
        {JSON.stringify(state)}
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState("")

    const createTodolist = () => {
        todolistsAPI.createTodolist(inputValue)
            .then((response: AxiosResponse<ResponseType>) => setState(response.data))
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="title" onChange={(e) => setInputValue(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState("")

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(inputValue)
            .then((response: any) => setState(response.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolist ID" onChange={(e) => setInputValue(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")

    const changeTitle = () => {
        todolistsAPI.updateTodolist(id, title)
            .then((response) => setState(response.data))
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolist ID" onChange={(e) => setId(e.currentTarget.value)}/>
            <input type="text" placeholder="new title" onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={changeTitle}>change todolist title</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState("")

    const getTasks = () => {
        todolistsAPI.getTasks(id)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolist ID" onChange={(e) => setId(e.currentTarget.value)}/>
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")

    const createTask = () => {
        todolistsAPI.createTask(id, title)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolist ID" onChange={(e) => setId(e.currentTarget.value)}/>
            <input type="text" placeholder="task title" onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState("")
    const [todolistId, setTodolistId] = useState("")

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder="todolist ID" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder="task ID" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
