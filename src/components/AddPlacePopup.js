import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name={"place"}
      title={"Новое место"}
      buttonText={"Создать"}
      id={"place"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="form__info form__info_place_name form__info_place-input"
          name="name"
          id="place-input"
          type="text"
          size="15"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="form__input-error place-input-error" />
        <input
          className="form__info form__info_place_link form__info_email-input"
          name="link"
          id="email-input"
          type="url"
          size="25"
          required
          placeholder="Сcылка на картинку"
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span className="form__input-error email-input-error" />
      </>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
