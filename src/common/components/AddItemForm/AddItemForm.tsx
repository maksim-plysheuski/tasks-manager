import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { AddBox } from "@mui/icons-material";
import s from "./style.module.scss";
import { Tooltip, Zoom } from "@mui/material";
import { iconStyle, inputStyle } from "common/style/style";
import { useAddItem } from "common/components/AddItemForm/hook/useAddItem";

type Props = {
  addItemCallback: (title: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm: FC<Props> = React.memo(({ addItemCallback, disabled = false }) => {

  const { title, error, onChangeHandler, addItemHandler, onKeyUpHandler } = useAddItem(addItemCallback);

  return (
    <div className={s.container}>
      <TextField sx={inputStyle}
                 error={!!error}
                 value={title}
                 onChange={onChangeHandler}
                 onKeyUp={onKeyUpHandler}
                 label={"Title"}
                 helperText={error}
                 disabled={disabled} />
      <Tooltip title={"Add Item"}
               arrow placement="top-start"
               TransitionComponent={Zoom}
               TransitionProps={{ timeout: 400 }}>
          <span>
        <IconButton sx={iconStyle} onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
          </span>
      </Tooltip>
    </div>
  );
});
