import './index.scss';
import Container from '../Container'
import React from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


export default function SavedNewsHeader() {
  const {name, savedArticles} = React.useContext(CurrentUserContext);
  // eslint-disable-next-line no-unused-vars
  const keywords = savedArticles.reduce((sum, item) => {
    sum[item.keyword] = sum[item.keyword] + 1 || 1
    return sum
  }, {})
  console.log(Object.keys(keywords).map(item => {
    return {title: item, repeats: keywords[item]}
  }))
  return (
    <section className="saved-news-header">
      <Container>
        <p className="saved-news-header__page-title">Сохранённые статьи</p>
        <h1 className="saved-news-header__title">{name}, у вас {savedArticles.length} сохранённых статей</h1>
        <p className="saved-news-header__keywords">По ключевым словам: <span
          className="saved-news-header__keyword">,</span> <span
          className="saved-news-header__keyword">Тайга</span> и <span
          className="saved-news-header__keyword">2-м другим</span></p>
      </Container>
    </section>
  );
}
