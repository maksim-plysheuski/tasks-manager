import { ChangeEvent, KeyboardEvent, useState } from "react";


export const useEditableSpan = (changeTitleCallback: (newValue: string) => void, value: string = "") => {

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

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  return {
    title,
    editMode,
    activateEditMode,
    activateViewMode,
    onKeyUpHandler,
    changeTitleHandler
  };
};