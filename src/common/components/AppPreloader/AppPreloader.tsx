import { CircularProgress } from "@mui/material";
import React from "react";


export const AppPreloader = () => {
  return(
    <div style={{ position: "fixed", width: '100%', top: '35%', textAlign: 'center' }}>
      <CircularProgress size={'200px'} sx={{color: '#16e0bd'}} />
    </div>
  )
}