import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="form__info form__info_user_name form__info_name-input"
          name="name"
          id="name-input"
          type="text"
          size="15"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
          required
        />
        <span className="form__input-error name-input-error" />
        <input
          className="form__info form__info_user_job form__info_job-input"
          name="profession"
          id="job-input"
          type="text"
          size="25"
          minLength="2"
          maxLength="50"
          value={description || ""}
          onChange={handleDescriptionChange}
          required
        />
        <span className="form__input-error job-input-error" />
      </>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
