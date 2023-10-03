import { CircularProgress } from "@mui/material";
import { AppHeader, ErrorSnackbar, Routing } from "common/components";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HashRouter } from "react-router-dom";
import { selectIsAppInitialized } from "app/appSelectors";
import { AppPreloader } from "common/components/appPreloader/AppPreloader";


export const App = () => {
  const isAppInitialized = useSelector(selectIsAppInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isAppInitialized) {
    return <AppPreloader />;
  }

  return (
    <HashRouter>
      <AppHeader />
      <Routing />
      <ErrorSnackbar />
    </HashRouter>
  );
};
