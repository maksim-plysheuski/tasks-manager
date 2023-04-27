import { CircularProgress } from "@mui/material";
import { AppHeader, ErrorSnackbar, Routing } from "common/components";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth-reducer";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { selectIsAppInitialized } from "app/app-selectors";
import { AppPreloader } from "common/components/AppPreloader/AppPreloader";


function App() {
  const isAppInitialized = useSelector(selectIsAppInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);


  if (!isAppInitialized) {
    return <AppPreloader />;
  }

  return (
    <BrowserRouter>
      <AppHeader />
      <Routing />
      <ErrorSnackbar />
    </BrowserRouter>
  );
}

export default App;
