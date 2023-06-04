import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      id={"update-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="form__info update-avatar__input form__info_avatar_link form__info_avatar-input"
          name="avatar-link"
          id="avatar-input"
          type="url"
          size="25"
          required
          placeholder=""
          //defaultValue="https://somewebsite.com/someimage.jpg"
          value={avatar || ""}
          onChange={handleAvatarChange}
        />
        <span className="form__input-error avatar-input-error" />
      </>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
