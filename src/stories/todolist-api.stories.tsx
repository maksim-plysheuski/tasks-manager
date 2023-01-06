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