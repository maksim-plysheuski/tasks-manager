import React, {useEffect, useState} from "react"
import {todolistAPI} from "../api/todolist-api";


export default {
    title: "API"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
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
        todolistAPI.createTodolist(inputValue)
            .then((response) => setState(response.data))
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
        todolistAPI.deleteTodolist(inputValue)
            .then((response) => setState(response.data))
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
        todolistAPI.updateTodolist(id, title)
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