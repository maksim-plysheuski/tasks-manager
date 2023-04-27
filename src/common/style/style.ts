import { SxProps, Theme } from "@mui/material";

export const btnStyle = {
  color: "white",
  borderColor: "#e66300",
  "&:hover": {
    color: "#e66300",
    borderColor: "#e66300",
    backgroundColor: "#333333"
  },
  "&.Mui-disabled": {
    color: "#C3C1C7"
  }
};

export const iconStyle: SxProps<Theme> = {
  color: "white",
  margin: "0 5px 0 5px",
  "&:hover": {
    color: "#e66300",
    bgcolor: "#4C4C4C",
    transition: "250ms ease-in-out"
  }
};

export const checkBoxStyle = {
  color: "#ffffff",
  marginLeft: "5px",
  "&:hover": {
    color: "#16e0bd",
    transition: "250ms ease-in-out"
  }
};

export const inputStyle = {
  "& label": {
    color: "#808080"
  },
  "& label.Mui-focused": {

    color: "#e66300"

  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4C4C4C"
    },
    "&:hover fieldset": {
      borderColor: "#808080"
    },
    "&.Mui-focused fieldset": {
      border: "3px solid #16e0bd"
    }
  },
  input: {
    color: "white",
    bgColor: "#171717"
  }
};