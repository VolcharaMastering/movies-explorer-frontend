import "./Portfolio.css";
import "../Main.css";

function portfolio(props) {
  return (
    <>
      <div className="portfolio__title-box">
        <h2 className="portfolio__portfolio">Портфолио</h2>
        <ul className="portfolio__links">
          <li className="portfolio__link-box">
            <a
              className="portfolio__link"
              href="https://volcharamastering.github.io/russian-travel_vmstr/"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
            <a
              className="portfolio__link-arrow"
              href="https://volcharamastering.github.io/russian-travel_vmstr/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              ↗
            </a>
          </li>
          <li className="portfolio__link-box">
            <a
              className="portfolio__link"
              href="https://volcharamastering.github.io/mesto_vmstr/"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
            <a
              className="portfolio__link-arrow"
              href="https://volcharamastering.github.io/mesto_vmstr/"
              target="_blank"
              rel="noreferrer"
            >
              ↗
            </a>
          </li>
          <li className="portfolio__link-box">
            <a
              className="portfolio__link"
              href="https://mesto.vmstr.nomoredomains.icu"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
            <a
              className="portfolio__link-arrow"
              href="https://mesto.vmstr.nomoredomains.icu"
              target="_blank"
              rel="noreferrer"
            >
              ↗
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default portfolio;
