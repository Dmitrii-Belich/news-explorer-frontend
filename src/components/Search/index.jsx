import './index.scss';
import Container from '../Container'
import React, {useState} from "react";


export default function Search({onSearch}) {
  const [search, setSearch] = useState('')
  return (
    <section className="search">
      <Container>
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.</p>
        <form className="search__string" onSubmit={(evt) => evt.preventDefault()}>
          <input className="search__input" type="text" placeholder="Введите запрос" value={search} required
                 onChange={(evt => setSearch(evt.target.value))}/>
          <button type="submit" className="search__button" onClick={() => {
            onSearch(search)
          }}>Искать</button>
        </form>
      </Container>
    </section>
  );
}
