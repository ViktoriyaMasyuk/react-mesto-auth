import React from "react";

function Sign(props) {
  return(
      <div className="sign sign__container">
        <form
          className="sign__form"
          method="get"
          name={`${props.name}-email`}
          noValidate
          onSubmit={props.onSubmit}
        >
            <fieldset className="form__set">
            <h2 className="sign__title">{props.title}</h2>
            <input
          className="form__info sign__input sign__form__email-input form__info_email-input"
          name="email"
          id="${props.name}-email-input"
          type="email"
          autoComplete="email"
          size="30"
          minLength="2"
          maxLength="30"
          required
          placeholder={"Email" || ""}
          value={props.email}
          onChange={props.onChange}
          
        />
        <span className="form__input-error email-input-error" />
        <input
          className="form__info sign__input sign__form__email-input form__info_password-input"
          name="password"
          id="${props.name}-password-input"
          type="password"
          autoComplete="current-password"
          minLength="6"
          size="25"
          required
          placeholder="Пароль"
          value={props.password}
          onChange={props.onChange}
        />
        <span className="form__input-error email-input-error" />  
            <button className="form__save form__submit sign__submit" type="submit" onClick={props.onEditResult} >
              {props.buttonText}
            </button>
            {props.children}
          </fieldset>
        </form>
      </div>
  )
}
export default Sign;