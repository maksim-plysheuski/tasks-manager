import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import s from "./style.module.scss";
import { Tooltip, Zoom } from "@mui/material";
import { inputStyle } from "common/style/style";
import { useEditableSpan } from "common/components/EditableSpan/hooks/useEditableSpan";

type Props = {
  value: string
  changeTitleCallback: (newValue: string) => void
}

export const EditableSpan: FC<Props> = React.memo(({ value, changeTitleCallback }) => {

  const {
    title, editMode,
    changeTitleHandler,
    activateEditMode,
    activateViewMode,
    onKeyUpHandler
  } = useEditableSpan(changeTitleCallback, value);

  return editMode
    ? <TextField value={title} onChange={changeTitleHandler}
                 onKeyUp={onKeyUpHandler}
                 autoFocus onBlur={activateViewMode}
                 sx={inputStyle} />
    : <Tooltip title={"Change Title"}
               arrow placement="top"
               TransitionComponent={Zoom}
               TransitionProps={{ timeout: 400 }}>
          <span>
         <span className={s.title} onClick={activateEditMode} onDoubleClick={activateEditMode}>{value}</span>
          </span>
    </Tooltip>;
});
