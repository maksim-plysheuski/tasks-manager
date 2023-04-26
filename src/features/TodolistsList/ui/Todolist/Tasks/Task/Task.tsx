import React, { ChangeEvent, FC, useCallback } from "react";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { TaskType } from "features/TodolistsList/api/todolists-api";
import { TaskStatuses } from "common/enums/common-enums";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks-slice";
import s from "./Task.module.css";


type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<Props> = React.memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId });

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: task.id, todolistId, domainModel: { status } });
  };

  const changeTitleHandler = useCallback(
    (title: string) => {
      updateTask({ taskId: task.id, todolistId, domainModel: { title } });
    },
    [task.id, todolistId]
  );

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />
      <EditableSpan value={task.title} changeTitleCallback={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
