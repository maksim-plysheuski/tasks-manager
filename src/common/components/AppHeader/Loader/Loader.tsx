import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectAppStatus } from "app/app-selectors";
import React from "react";

const lineProgressSx = { position: "absolute", top: "60px", width: "100%", bgcolor: "#16e0bd" };

export const Loader = () => {
  const status = useAppSelector(selectAppStatus);
  return (
    <>
      {status === "loading" && <LinearProgress sx={lineProgressSx} color={"info"} />}
    </>
  );
};