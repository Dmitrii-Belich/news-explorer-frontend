import './index.scss'
import {ReactComponent as SvgNotFound} from '../../images/not-found_v1.svg';
import preloader from '../../images/preloader.png'
import NewsCard from '../NewsCard'
import Container from '../Container'
import React, {useState} from "react";

export default function NewsCardList({isResults = false, news, onSave, onDelete, isLoading = false, isFailed = false}) {
  const [counter, setCounter] = useState(isResults ? 3 : news.length)
  return (
    <section className="news-card-list">
      <Container>
        {isLoading ? (
            <div className="preloader"><img className="preloader__img preloader__img_animated" alt="Изображение загрузки" src={preloader}/> <p
              className="preloader__text">Идет поиск новостей...</p></div>)
          : news.length ?
            (<>
              {isResults && (<h2 className="news-card-list__title">Результаты поиска</h2>)}
              <ul className="news-card-list__container">
                {news.slice(0, counter).map((article, i) => {
                  return <NewsCard article={article} key={i} onSave={onSave} onDelete={onDelete} isResult={isResults}/>
                })}
              </ul>
              {news.length >= counter && isResults && (<button className="news-card-list__more" onClick={() => {
                setCounter(counter + 3)
              }}>Показать ещё</button>)}
            </>) :
            isFailed && (<div className="preloader"><SvgNotFound className="preloader__img"/>
              <h3 className="preloader__title">Ничего не найдено</h3>
              <p className="preloader__text">К сожалению по вашему запросу
                ничего не найдено.</p></div>)

        }
      </Container>
    </section>
  );
}
