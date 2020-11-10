import './index.scss';
import Container from '../Container'
import {ReactComponent as SvgGithub} from '../../images/github.svg';
import {ReactComponent as SvgVk} from '../../images/vk.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
        <nav className="footer__navigation">
          <ul className="footer__navigation-list">
            <li className="footer__list-item">
              <a className="footer__navigation-link" href="./">
                Главная
              </a>
            </li>
            <li className="footer__list-item">
              <a className="footer__navigation-link" rel="noreferrer" href="https://praktikum.yandex.ru"
                 target="_blank">
                Яндекс.Практикум
              </a>
            </li>
          </ul>
        </nav>
        <nav className="footer__icons">
          <ul className="footer__icons-list">
            <li className="footer__list-item">
              <a className="footer__icons-link" rel="noreferrer" href="https://github.com/Dmitrii-Belich"
                 target="_blank">
                <SvgGithub className="footer__icons-svg"/>
              </a>
            </li>
            <li className="footer__list-item">
              <a className="footer__icons-link" rel="noreferrer" href="https://vk.com/id171896324" target="_blank">
                <SvgVk className="footer__icons-svg"/>
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
