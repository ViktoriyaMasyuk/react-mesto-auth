import React, { useEffect } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = props.cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={props.onCardClick}
      onCardLike={props.onCardLike}
      onCardDelete={props.onCardDelete}
    />
  ));

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button className="profile__button" onClick={props.onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
          </button>
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button button-hover"
            type="button"
            onClick={props.onEditProfile}
          />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {cardsElements}
      </section>
    </main>
  );
}
export default Main;
