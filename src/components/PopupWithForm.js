import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name}-popup ${
        props.isOpen ? `popup_opened` : ""
      } `}
      id={`${props.id}`}
    >
      <div className="popup__container">
        <form
          className={`form form-${props.name}`}
          method="get"
          name={`${props.name}-info`}
          noValidate
          onSubmit={props.onSubmit}
        >
          <button
            className="form__close popup__close button-hover"
            type="button"
            onClick={props.onClose}
          ></button>
          <fieldset className="form__set">
            <h2 className="form__title">{props.title}</h2>
            {props.children}
            <button className="form__save form__submit" type="submit">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
