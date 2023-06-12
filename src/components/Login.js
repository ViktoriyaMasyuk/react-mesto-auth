import React, { useState } from "react";
import Sign from "./Sign";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Login({handleAuthorize}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  //авторизация пользователя
  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleAuthorize(formValue.email, formValue.password);
    setFormValue({ email: "", password: "" });
  }

  return (
    <Sign
      title={"Вход"}
      buttonText={"Войти"}
      name={"login"}
      onSubmit={handleSubmit}
      onChange={handleChange}
      email={formValue.email}
      password={formValue.password}
    >
    </Sign>
  );
}
export default Login;
