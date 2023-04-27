import s from "./style.module.scss";
import React from "react";


export const DescriptionBlock = () => {

  const REGISTER_LINK = "https://social-network.samuraijs.com/signUp";

  return (
    <div className={s.registerDescription}>
      <a href={REGISTER_LINK} target="_blank" rel="noreferrer">
        Create your own account here
      </a>
      <div className={s.loginData}>
        <span>or use common test account credentials:</span>
        <span>Email: free@samuraijs.com</span>
        <span>Password: free</span>
      </div>
    </div>
  );
};