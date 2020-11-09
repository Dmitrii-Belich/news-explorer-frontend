import './index.scss';
import Container from '../Container'
import {ReactComponent as SvgExit} from '../../images/Exit.svg';
import React, {useEffect, useState} from "react";
import { useHistory, Link } from 'react-router-dom'
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function Header({popupOpen, isLoggedIn, onLogOut, isPopupOpen}) {
  const { name } = React.useContext(CurrentUserContext);
  const history = useHistory()
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMainPage, setIsMainPage] =useState(history.location.pathname === '/')
  history.listen((evt) => setIsMainPage(evt.pathname === '/'))
  const handleScroll = () => {
    window.scrollY !== 0 ? setScrolled(true) : setScrolled(false)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`header ${(!isMainPage || scrolled) && !isPopupOpen && 'header_type_white'} ${isOpen && 'header_type_opened'}`}>
      <Container>
        <p className="header__name">NewsExplorer</p>
        { !isPopupOpen && <button className={`header__close ${(!isMainPage || scrolled) && 'header__close_type_white'}`} onClick={() => {
          setIsOpen(!isOpen)
        }}/>}
        <nav className="header__nav">
          <Link className={`header__link ${isMainPage && 'header__link_type_active'}`} to="/">Главная</Link>
          { isLoggedIn && (<Link className={`header__link ${!isMainPage && 'header__link_type_active'}`} to="/saved-news">Сохранённые статьи</Link>)}
          { isLoggedIn
            ? (<button className="header__user" onClick={onLogOut}>{name}<SvgExit className="header__user-svg"/></button>)
            : (<button className="header__user" onClick={popupOpen}>Авторизоваться</button>)
          }
        </nav>
      </Container>
    </header>
  );
}
