import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItemTitle: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItemTitle(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return (
        <div>
            <TextField
                error={!!error}
                id="outlined-basic"
                label={error}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size="small"
            />


            <Button variant="contained" style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                    onClick={addTask}>+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}