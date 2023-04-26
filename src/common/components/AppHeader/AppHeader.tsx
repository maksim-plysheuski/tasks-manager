import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserEmail } from "features/auth/model/auth-selectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth-slice";
import s from "./style.module.scss";
import { useAppSelector } from "common/hooks/useAppSelector";
import { Loader } from "common/components/AppHeader/Loader/Loader";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";


export const AppHeader = () => {
  const { logout } = useActions(authThunks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useAppSelector(selectUserEmail);

  const logoutHandler = () => logout();
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.logoContainer}>
          <ListAltRoundedIcon sx={{ color: "#e66300" }} fontSize={"large"} />
          <h3>Task Manager</h3>
        </div>
        {isLoggedIn && (
          <div>
            <span>{userEmail}</span>
            <button onClick={logoutHandler}>
              Log out
            </button>
          </div>
        )}
      </div>
      <Loader />
    </header>
  );
};