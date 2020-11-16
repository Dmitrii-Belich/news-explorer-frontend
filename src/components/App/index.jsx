import "./index.scss";
import Footer from "../Footer";
import Header from "../Header";
import PopupWithForm from "../PopupWithForm";
import React, { useEffect, useState } from "react";
import { register, authorize, checkToken } from "../../utils/auth";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../Main";
import SavedNews from "../SavedNews";
import Api from "../../utils/Api";
import getSearchedArticles from "../../utils/NewsApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiOptions } from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("searchedArticles")) || []
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentSearch, setCurrentSearch] = useState(
    localStorage.getItem("searchRequest") || ""
  );
  const [newsLoading, setNewsLoading] = useState(false);
  const [isSearchFailed, setIsSearchFailed] = useState(false);
  // eslint-disable-next-line
  let api = new Api(apiOptions, token);
  useEffect(() => {
    if (token) {
      checkToken(token)
        .then((res) => {
          setUser(res);
          setIsLoggedIn(true);
          // eslint-disable-next-line
          api = new Api(apiOptions, token);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getSavedArticles().then((data) => {
        setSavedArticles(data);
      });
    } else {
      setSavedArticles([]);
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const searchSubmitHandler = async (request) => {
    setNewsLoading(true);
    setCurrentSearch(request);
    getSearchedArticles(request).then((data) => {
      if (data.status === "ok") {
        setNews(data.articles);
        setNewsLoading(false);
        localStorage.setItem("searchedArticles", JSON.stringify(data.articles));
        localStorage.setItem("searchRequest", request);
      }
      if (!data.totalResults) {
        setNewsLoading(false);
        setIsSearchFailed(true);
      }
    });
  };

  const formSubmitHandler = async (password, email, name) => {
    let isSucssesful = false;
    let message = "";
    if (name) {
      await register({ password, email, name })
        .then((res) => {
          isSucssesful = true;
        })
        .catch(async (err) => {
          await err.json().then((msg) => {
            message = msg.message;
          });
        });
      if (isSucssesful) {
        return Promise.resolve("register");
      }
      return Promise.reject(message);
    } else {
      await authorize({ password, email })
        .then((res) => {
          isSucssesful = true;
          if (res.token) {
            setToken(res.token);
            localStorage.setItem("token", res.token);
            setIsLoggedIn(true);
            setUser(user);
            setIsPopupOpen(false);
          }
        })
        .catch(async (err) => {
          await err.json().then((msg) => {
            message = msg.message;
          });
        });
      if (isSucssesful) {
        return Promise.resolve();
      }
      return Promise.reject(message);
    }
  };

  const onLogOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
    setIsLoggedIn(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const escHandler = (evt) => {
    if (evt.key === "Escape") {
      closePopup();
    }
  };

  const saveButtonHandler = async (article) => {
    if (!isLoggedIn) {
      setIsPopupOpen(true);
      return;
    }
    api
      .saveArticle({ ...article, keyword: currentSearch })
      .then((data) => {
        setSavedArticles([...savedArticles, data]);
      })
      .catch((err) => console.log(err));
  };

  const deleteButtonHandler = async (id) => {
    if (!isLoggedIn) {
      setIsPopupOpen(true);
      return;
    }
    api
      .deleteArticle(id)
      .then((data) => {
        setSavedArticles([
          ...savedArticles.filter((item) => item._id !== data._id),
        ]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="root">
      <CurrentUserContext.Provider value={{ ...user, savedArticles }}>
        <Header
          isLoggedIn={isLoggedIn}
          popupOpen={openPopup}
          onLogOut={onLogOut}
          isPopupOpen={isPopupOpen}
        />
        <Switch>
          <Route exact path="/">
            <Main
              news={news}
              onSearch={searchSubmitHandler}
              onSave={saveButtonHandler}
              onDelete={deleteButtonHandler}
              isLoading={newsLoading}
              isFailed={isSearchFailed}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/saved-news"
            setIsPopupOpen={setIsPopupOpen}
            component={SavedNews}
            isLoggedIn={isLoggedIn}
            onSave={saveButtonHandler}
            onDelete={deleteButtonHandler}
            isLoading={newsLoading}
            isFailed={isSearchFailed}
          />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>

        <Footer />
        <PopupWithForm
          onKeyDown={escHandler}
          isOpen={isPopupOpen}
          onClose={closePopup}
          onSubmit={formSubmitHandler}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
