import "./index.scss";
import Container from "../Container";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function SavedNewsHeader() {
  const { name, savedArticles } = React.useContext(CurrentUserContext);
  // eslint-disable-next-line no-unused-vars
  let keywords = savedArticles.reduce((sum, item) => {
    sum[item.keyword] = sum[item.keyword] + 1 || 1;
    return sum;
  }, {});
  keywords = Object.keys(keywords)
    .map((item) => {
      return { title: item, repeats: keywords[item] };
    })
    .sort((a, b) => b.repeats - a.repeats);
  return (
    <section className="saved-news-header">
      <Container>
        <p className="saved-news-header__page-title">Сохранённые статьи</p>
        <h1 className="saved-news-header__title">
          {name}, у вас {savedArticles.length} сохранённых статей
        </h1>
        <p className="saved-news-header__keywords">
          По {keywords.length > 1 ? "ключевым словам" : "ключевому слову"}:
          {keywords[0] && (
            <span className="saved-news-header__keyword">
              {" "}
              {keywords[0].title}
            </span>
          )}
          {keywords.length === 2 ? " и" : keywords.length === 1 ? "." : ","}
          {keywords[1] && (
            <span className="saved-news-header__keyword">
              {" "}
              {keywords[1].title}
            </span>
          )}
          {keywords.length <= 2 ? (keywords.length === 1 ? "" : ".") : " и "}
          {keywords[2] && (
            <span className="saved-news-header__keyword">
              {keywords.length === 3
                ? `${keywords[2].title}.`
                : `${keywords.length - 2}-м другим.`}
            </span>
          )}
        </p>
      </Container>
    </section>
  );
}
