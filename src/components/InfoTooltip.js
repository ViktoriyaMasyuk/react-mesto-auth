import React from "react";

function InfoTooltip(props) {
    return (
        <div
        className={`popup infoTooltip-popup ${props.isOpen ? `popup_opened` : ' '
        } `}
      >
        <article className="infoTooltip">
        <button
          className="image-card__close popup__close button-hover"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
            className="infoTooltip__image"
            src={props.src}
            alt="изображение итога авторизации"
        />
        <h2 className="infoTooltip__title"> {props.title} </h2>
        </article>
      </div> 
    )
}
export default InfoTooltip;