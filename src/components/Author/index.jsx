import './index.scss';
import Container from '../Container'
import avatar from '../../images/avatar.jpg';
import React from "react";

export default function Author() {
  return (
    <section className="author">
      <Container>
        <div className="author__image-wrapper">
          <img className="author__image" alt="Аватар автора" src={avatar}/>
        </div>
        <div className="author__about">
          <h2 className="author__title">Об авторе</h2>

          <p className="author__description">
            Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими
            технологиями разработки владеете.
            </p>
            <p className="author__description">
            Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь
            потенциальным заказчикам.
          </p>
        </div>
      </Container>
    </section>
  );
}
