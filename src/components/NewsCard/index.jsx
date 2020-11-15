import "./index.scss";
import { ReactComponent as SvgSave } from "../../images/SaveIcon.svg";
import { ReactComponent as SvgDelete } from "../../images/delete.svg";
import { ReactComponent as SvgSaved } from "../../images/saved.svg";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const defaultImg =
  "https://sun9-30.userapi.com/-fh5tOOD8WnKxR4XVfpINisiJ1bZkdysj-57UA/J4uC-xB2gz8.jpg";

export default function NewsCard({ article, onSave, onDelete, isResult }) {
  const { savedArticles, name } = useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(
    savedArticles.find((item) => item.title === article.title) !== undefined
  );
  useEffect(() => {
    setIsSaved(
      savedArticles.find((item) => item.title === article.title) !== undefined
    );
  }, [savedArticles, article.title]);
  const [id, setId] = useState("");
  const [additionalText, setAdditionalText] = useState(
    name
      ? isResult
        ? ""
        : "Убрать из сохранённых"
      : isResult
      ? "Войдите, чтобы сохранять статьи"
      : ""
  );
  useEffect(() => {
    setAdditionalText(
      name
        ? isResult
          ? ""
          : "Убрать из сохранённых"
        : isResult
        ? "Войдите, чтобы сохранять статьи"
        : ""
    );
  }, [name, isResult]);
  useEffect(() => {
    if (isSaved) {
      setId(
        savedArticles.find((item) => item.title === article.title)
          ? savedArticles.find((item) => item.title === article.title)._id
          : ""
      );
    }
  }, [isSaved, savedArticles, article.title]);
  let img;
  if (isResult) {
    img = article.urlToImage ? article.urlToImage : defaultImg;
  } else {
    img = article.image;
  }

  const date = new Date(article.publishedAt || article.date);
  const NUMBER_TO_MONTH = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return (
    <li className="news-card">
      <a className="news-card__link" href={article.link}>
        {article.keyword && !isResult && (
          <p className="news-card__keyword">{article.keyword}</p>
        )}
        <img
          alt="Изображение карточки"
          className="news-card__image"
          src={img}
        />
        <p className="news-card__date">{`${date.getDate()} ${
          NUMBER_TO_MONTH[date.getMonth()]
        }, ${date.getFullYear()}`}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">
          {article.description || article.text}
        </p>
        <p className="news-card__portal">
          {article.source.name || article.source}
        </p>
      </a>
      <button
        className="news-card__save"
        onClick={() =>
          isSaved
            ? onDelete(id)
            : onSave({
                title: article.title,
                text: article.description,
                date: article.publishedAt,
                source: article.source.name,
                image: img,
                link: article.url,
              })
        }
      >
        {isResult ? isSaved ? <SvgSaved /> : <SvgSave /> : <SvgDelete />}
      </button>
      {additionalText && (
        <p className="news-card__keyword news-card__keyword_type_additional">
          {additionalText}
        </p>
      )}
    </li>
  );
}
