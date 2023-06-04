import React from "react";
function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div
      className={`popup image-popup ${card.link != "" ? `popup_opened` : " "} `}
    >
      <article className="image-card">
        <button
          className="image-card__close popup__close button-hover"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="image-card__photo"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="image-card__title"> {card ? card.name : ""} </h2>
      </article>
    </div>
  );
}
export default ImagePopup;
