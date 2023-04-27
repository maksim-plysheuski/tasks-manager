import React, { ChangeEvent, FC, useCallback } from "react";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { Task } from "features/TodolistsList/api/tasks-api";
import { TaskStatuses } from "common/enums/common-enums";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks-slice";
import s from "./style.module.scss";
import { Tooltip, Zoom } from "@mui/material";
import { checkBoxStyle, iconStyle } from "common/style/style";


type Props = {
  task: Task;
  todolistId: string;
};

export const SingleTask: FC<Props> = React.memo(({ task, todolistId }) => {
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
    <div key={task.id} className={`${s.allTasks} ${task.status === TaskStatuses.Completed ? s.CompletedTasks : ""} `}>
      <Checkbox id={task.id} checked={task.status === TaskStatuses.Completed} sx={checkBoxStyle} color="warning"
                onChange={changeStatusHandler} />
      <EditableSpan value={task.title} changeTitleCallback={changeTitleHandler} />
      <Tooltip title={"Delete"}
               arrow placement="right"
               TransitionComponent={Zoom}
               TransitionProps={{ timeout: 400 }}>
          <span>
        <IconButton sx={iconStyle} onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
          </span>
      </Tooltip>
    </div>
  );
});
