import React from "react";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { useLogin } from "features/auth/ui/login/hooks/useLogin";
import s from "./style.module.scss";
import { DescriptionBlock } from "features/auth/ui/login/descriptionBlock/DescriptionBlock";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { btnStyle, iconStyle, inputStyle } from "common/style/style";


export const Login = () => {
  const { formik, isLoggedIn, showPassword, showPasswordHandler } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={s.loginPage}>
      <div className={s.formContainer}>
        <h2 className={s.title}>Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={s.from}>
            <DescriptionBlock />
            <TextField
              sx={{ ...inputStyle, mt: 2 }}
              id="email"
              autoComplete="email"
              label="Email"
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              {...formik.getFieldProps("email")}
            />
            <TextField
              sx={{ ...inputStyle, mt: 3 }}
              autoComplete="current-password"
              id="password"
              type={showPassword ? "text" : "password"}
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              label="Password"
              {...formik.getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={iconStyle}
                                aria-label="toggle password visibility"
                                onClick={showPasswordHandler}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>)
              }} />;
            <FormControlLabel label={"Remember me"}
                              control={<Checkbox sx={iconStyle} {...formik.getFieldProps("rememberMe")}
                                                 checked={formik.values.rememberMe} />} />
            <Button type={"submit"} sx={{ ...btnStyle, border: 1, mt: 2 }}>Login</Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};