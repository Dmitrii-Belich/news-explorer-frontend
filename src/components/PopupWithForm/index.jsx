import './index.scss';
import React, {useEffect, useState} from "react";


export default function PopupWithForm({isOpen, onSubmit, onClose}) {
  const [isSignIn, setIsSignIn] = useState(true)
  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [buttonText, setButtonText] = useState(
    isSignIn ? "Войти" : "Зарегестрироваться"
  );
  const [titleText, setTitleText] = useState(
    isSignIn ? "Вход" : "Регистрация"
  );
  const [linkText, setLinkText] = useState(
    isSignIn ? "Зарегестрироваться" : "Войти"
  );
  const [validity, setValidity] = useState(isSignIn ? {email: false, password: false} : {
    email: false,
    password: false,
    name: false
  });
  const [validationMessages, setValidationMessages] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setButtonText(isSignIn ? "Войти" : "Зарегестрироваться")
    setTitleText(isSignIn ? "Вход" : "Регистрация")
    setLinkText(isSignIn ? "Зарегестрироваться" : "Войти")
    setValidity(isSignIn ? {email: validity.email, password: validity.password} : {
      email: validity.email,
      password: validity.password,
      name: false
    })
    setFormErrorMessage('')
    setName('')
    // eslint-disable-next-line
  }, [isSignIn])

  const inputChangers = {
    email: setEmail,
    password: setPassword,
    name: setName,
  };

  const inputHandler = (evt) => {
    inputChangers[evt.target.name](evt.target.value);
    const newValidity = Object.assign({}, validity);
    newValidity[evt.target.name] = evt.target.validity.valid;
    setValidity(newValidity);
    const newValidationMessages = Object.assign({}, validationMessages);
    newValidationMessages[evt.target.name] = evt.target.validationMessage;
    setValidationMessages(newValidationMessages);
  };

  const clearInput = () => {
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setName('')
      setValidity({email: false, password: false, name: false});
      setValidationMessages({email: '', password: '', name: ''})
      setIsSignIn(true);
      setButtonText(isSignIn ? "Войти" : "Зарегестрироваться")
    }, 200);
  };

  const isFormValid = () => {
    return Object.values(validity).reduce((summ, currentItem) => {
      return summ && currentItem;
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText(isSignIn ? "Вход..." : "Регистрация...");
    onSubmit(
      password,
      email,
      name
    )
      .then(() => {
        clearInput();
      })
      .catch((message) => {
        setFormErrorMessage(message)
        setButtonText("Попробовать еще раз");
      });
  };
  return (
    <div className={`popup ${isOpen && "popup_display_opened"}`}>
      <form className="popup__container" onSubmit={handleSubmit} noValidate>
        <h2 className="popup__title">{titleText}</h2>
        <span className="popup__input-title">Email</span>
        <input
          type="email"
          className="popup__input"
          name="email"
          required
          placeholder="Введите почту"
          onChange={inputHandler}
          value={email}
        />
        <span className="popup__input-error">{validationMessages.email}</span>
        <span className="popup__input-title">Пароль</span>
        <input
          type="password"
          className="popup__input"
          name="password"
          placeholder="Введите пароль"
          required
          minLength="3"
          onChange={inputHandler}
          value={password}
        />
        <span className="popup__input-error">{validationMessages.password}</span>
        {!isSignIn &&
        (<>
          <span className="popup__input-title">Имя</span>
          <input
            type="text"
            className="popup__input"
            name="name"
            placeholder="Введите своё имя"
            required
            minLength="2"
            maxLength="30"
            onChange={inputHandler}
            value={name}
          />
          <span className="popup__input-error">{validationMessages.name}</span>
        </>)
        }
        <p
          className={`popup__form-error ${formErrorMessage && 'popup__form-error_display_visible'}`}>{formErrorMessage}</p>
        <button type="submit"
                className={`popup__save ${
                  !isFormValid() && "popup__save_display_error"
                }`}
                disabled={!isFormValid() && "disabled"}>{buttonText}
        </button>
        <button type="button" className="popup__exit-button" onClick={() => {
          onClose()
          clearInput()
        }}/>
        <p className="popup__form-description">или <a href="/"
                                                      className="popup__link" onClick={(evt) => {
          evt.preventDefault()
          setIsSignIn(!isSignIn)
        }}>{linkText}</a></p>
      </form>
      <div className="popup__overlay" onClick={() => {
        onClose()
        clearInput()
      }}/>
    </div>
  )
    ;
}
