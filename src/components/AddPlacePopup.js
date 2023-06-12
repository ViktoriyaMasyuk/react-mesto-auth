import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // const [name, setName] = React.useState("");
  // const [link, setLink] = React.useState("");

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }
  // function handleLinkChange(e) {
  //   setLink(e.target.value);
  // }

//   React.useEffect(() => {
//     setName("");
//     setLink("");
//   }, [isOpen]);


const name = useForm('');
const link = useForm('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, link);
    onAddPlace({
      name: name.values.name,
      link: link.values.link,
    });
 }
 //не совсем поняла, как именно запускать валидацию
 const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  return (
    <PopupWithForm
      name={"place"}
      title={"Новое место"}
      buttonText={"Создать"}
      id={"place"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
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
          //value={name || ""}
          value={name.value}
          onChange={name.handleChange}
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
          //value={link || ""}
          value={link.value}
          onChange={link.handleChange}
        />
        <span className="form__input-error email-input-error" />
      </>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
