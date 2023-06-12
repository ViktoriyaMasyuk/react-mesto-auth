import "../index.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, ProtectedRoute, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import imageResult from "../images/Unionok2.svg";
import imageError from "../images/Union-2.svg";
import ProtectedRouteElement from "./ProtectedRoute";
import * as Auth from "../utils/Auth";


function App() {
  //попап аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  //попап профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  //попап добавления карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  //информация о пользователе
  const [currentUser, setCurrentUser] = useState({});
  //информация о карточках
  const [cards, setCards] = useState([]);
  //положительный попап входа
  const [isInfoTooltipResultPopupOpen, setInfoTooltipResultPopupOpen] = useState(false);
  //попап ошибки входа
  const [isInfoTooltipErrorPopupOpen, setInfoTooltipErrorPopupOpen] = useState(false);
  //статус входа в систему пользователя
  const [isLoggedIn, setLoggedIn] = useState();
//навигация
  const navigate = useNavigate();
//данные пользователя
const [email, setEmail] = useState(false);

//получение информации о пользоывателе и массива карточек
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
//функции открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleTooltipErrorClick() {
    setInfoTooltipErrorPopupOpen(true);
  }
  function handleTooltipResultClick() {
    setInfoTooltipResultPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //функция изменения статуса логина
  function handleLogin() {
    setLoggedIn(true);
 } 
 //функция закрытия попапов
  function handleCloseAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setInfoTooltipErrorPopupOpen(false);
    setInfoTooltipResultPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }
  
//функция постановки лайков
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .unsetLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  //функция удаления карточек
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  //обновление информации о пользователе
  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //обновление аватара
  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
//Добавление новой карточки
  function handleAddPlace(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
//регистрация пользователя
  function handleRegisterUser(email, password) {
    Auth.register(email, password)
    .then((data) => {
      if(data) {
        handleTooltipResultClick();
        console.log("sucess");
        navigate("/sign-in", {replace: true});
      }
    })
    .catch((err) => {
      navigate("/sign-up");
      handleTooltipErrorClick();
      console.log(err);   
    })
  }

//проверка токена
function tokenCheck() {
  const jwt = localStorage.getItem('jwt');
  if (jwt){
    Auth.getContent(jwt)
    .then((res) => {
      if (res){
        handleLogin();
        setEmail(res.data.email);
        navigate("/", {replace: true})
      }
    });
}
} 

useEffect(() => {
tokenCheck();
}, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
        emailUser={email}
        isLoggedIn={isLoggedIn}
        />
        <Routes>
         <Route path="/" element={
         <ProtectedRouteElement
           element={Main}
           isLoggedIn={isLoggedIn}
           onEditAvatar={handleEditAvatarClick}
           onEditProfile={handleEditProfileClick}
           onAddPlace={handleAddPlaceClick}
           onCardClick={handleCardClick}
           cards={cards}
           onCardLike={handleCardLike}
           onCardDelete={handleCardDelete}
           
           />} />  
         <Route 
         path="/sign-up"
         element={<Register onRegister={handleRegisterUser}/>}
        />
        <Route 
        path="/sign-in"
        element={<Login handleLogin={handleLogin} handleTooltipError={handleTooltipErrorClick}/>}
        />

        </ Routes >
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm
          name={"basket"}
          title={"Новое место"}
          buttonText={"Вы уверены?"}
          id={"delete"}
          onClose={handleCloseAllPopups}
        />
        <ImagePopup
          isOpen={selectedCard}
          card={selectedCard}
          onClose={handleCloseAllPopups}
        />
        <InfoTooltip 
        title={"Вы успешно зарегистрировались!"}
        src={imageResult}
        isOpen={isInfoTooltipResultPopupOpen}
        onClose={handleCloseAllPopups}
        />
        <InfoTooltip 
        title={"Что-то пошло не так! Попробуйте еще раз!"}
        src={imageError}
        isOpen={isInfoTooltipErrorPopupOpen}
        onClose={handleCloseAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
