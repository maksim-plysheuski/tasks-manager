import { ChangeEvent, KeyboardEvent, useState } from "react";
import { BaseResponse } from "common/types";


export const useAddItem = (addItemCallback: (title: string) => Promise<any>) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItemCallback(title)
        .then(() => {
          setTitle("");
        })
        .catch((err: BaseResponse) => {
          if (err?.resultCode) {
            setError(err.messages[0]);
          }
        });
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === "Enter") {
      addItemHandler();
    }
  };
  return {
    title,
    error,
    onChangeHandler,
    onKeyUpHandler,
    addItemHandler
  };
};