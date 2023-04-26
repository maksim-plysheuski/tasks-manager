
import AppBar from "@mui/material/AppBar";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAppStatus } from "app/app-selectors";
import { selectIsLoggedIn } from "features/auth/model/auth-selectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth-slice";



export const AppHeader = () => {
  const { logout } = useActions(authThunks);
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const logoutHandler = () => logout();
  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">Task Manager</Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}