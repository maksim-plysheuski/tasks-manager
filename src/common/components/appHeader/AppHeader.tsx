import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserEmail } from "features/auth/model/authSelectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/authSlice";
import s from "./style.module.scss";
import { useAppSelector } from "common/hooks/useAppSelector";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import { Loader } from "./loader/Loader";


export const AppHeader = () => {
  const { logout } = useActions(authThunks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useAppSelector(selectUserEmail);

  const logoutHandler = () => logout();

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.logoContainer}>
          <ListAltRoundedIcon sx={{ color: "#16e0bd" }} fontSize={"large"} />
          <h3>Task Manager</h3>
        </div>
        {isLoggedIn && (
          <div>
            <span className={s.email}>{userEmail}</span>
            <button onClick={logoutHandler}>
              LOG OUT
            </button>
          </div>
        )}
      </div>
      <Loader />
    </header>
  );
};