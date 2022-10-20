import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.callback(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <TextField variant="outlined"
                         value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}