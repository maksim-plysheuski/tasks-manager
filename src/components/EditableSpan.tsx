import React, {ChangeEvent, useState} from "react";


type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [onEditMode, setOnEditMod] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setOnEditMod(!onEditMode)
        addTask();
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.value)
    }

    const addTask = () => {
        if (newTitle.trim() !== "") {
            props.callback(newTitle)
        }
    }


    return (
        !onEditMode
            ? <span onDoubleClick={onDoubleClickHandler}>{newTitle}</span>
            : <input value={props.title} onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus/>

    )
}