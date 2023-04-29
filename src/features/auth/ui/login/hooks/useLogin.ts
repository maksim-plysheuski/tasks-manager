import { FormikHelpers, useFormik } from "formik";
import { LoginParams } from "features/auth/api/authApi";
import { BaseResponse } from "common/types";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/authSlice";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/auth/model/authSelectors";
import { useState } from "react";

type FormikErrorType = Partial<Omit<LoginParams, "captcha">>

export const useLogin = () => {
  const { login } = useActions(authThunks);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const showPasswordHandler = () => setShowPassword(state => !state);

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 3) {
        errors.password = "Password must be 3 characters or more";
      }

      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParams>) => {
      login(values)
        .unwrap()
        .catch((reason: BaseResponse) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    }
  });

  return { formik, isLoggedIn, showPassword, showPasswordHandler };
};