import React, { useState } from "react";
import Sign from "./Sign";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Login(props) {
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
    Auth.authorize(formValue.email, formValue.password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
          setFormValue({ email: "", password: "" });
          props.handleLogin();
          navigate("/", { replace: true });
      })
      .catch((err) => {
        props.handleTooltipError();
        console.log(err);
      });
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
