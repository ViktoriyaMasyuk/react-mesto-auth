import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      {isOwn && (
        <button
          className="card__delete button-hover"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="card__image"
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="card__name">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <h4 className="card__count-likes">{props.card.likes.length}</h4>
        </div>
      </div>
    </article>
  );
}
export default Card;
