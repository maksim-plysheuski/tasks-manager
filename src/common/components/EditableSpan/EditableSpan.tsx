import React, { ChangeEvent, FC, useState } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  value: string
  changeTitleCallback: (newValue: string) => void
}

export const EditableSpan: FC<Props> = React.memo(({ value, changeTitleCallback }) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };

  const activateViewMode = () => {
    setEditMode(false);
    changeTitleCallback(title);
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  return editMode
    ? <TextField value={title} onChange={changeTitleHandler} autoFocus onBlur={activateViewMode} />
    : <span onDoubleClick={activateEditMode}>{value}</span>;
});
