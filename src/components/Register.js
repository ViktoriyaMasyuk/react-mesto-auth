import React, { useState } from "react";
import Sign from "./Sign";

function Register({onRegister}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
      })

    function handleChange(e) {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
          });
    }
    function handleSubmit(e) {
      e.preventDefault();
      onRegister( formValue.email, formValue.password );
    }


    return (
        <Sign
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        name={"register"}
        onChange={handleChange}
        onSubmit={handleSubmit}
        email={formValue.email}
        password={formValue.password}
        >
        <>
        <h4 className="sign__subtitle">Уже зарегистрированы? <a href="/sign-in" className="sign__subtitle">Войти</a></h4>
        </>
        </Sign>
    )
}
export default Register;