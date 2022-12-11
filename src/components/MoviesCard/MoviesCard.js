import React, { useEffect } from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const [like, setLike] = React.useState(false);
  const handleToggleMovie = () => {
    if (props.movie.isSaved) {
      setLike(false);
      props.movie.isSaved = false;
      props.delMovie(props.movie.id);
    } else {
      setLike(true);
      props.movie.isSaved = true;
      props.savedMovie(props.movie);
    }
  };
  useEffect(() => {
    setLike(props.movie.isSaved);
  }, [props.movie.isSaved]);
  const pathname = window.location.pathname;
  return (
    <article className="movies-card">
      <div className="movies-card__image-box">
        <a
          className="movies-card__image-link"
          href={props.movie.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="movies-card__image"
            src={`https://api.nomoreparties.co${props.movie.image.url}`}
            alt={`Постер к фильму: ${props.movie.nameRU}`}
          />
        </a>
        <button
          className={
            pathname !== "/saved-movies"
              ? `${like ? "movies-card__saved" : "movies-card__save"}`
              : "movies-card__unsave"
          }
          type="button"
          onClick={handleToggleMovie}
          aria-label={`${like ? "Удалить" : "Сохранить"}`}
        >
          {`${like ? "" : "Сохранить"}`}
        </button>
      </div>
      <div className="movies-card__caption">
        <h2 className="movies-card__name">{props.movie.nameRU}</h2>
        <div className="movies-card__duration-box">
          <p className="movies-card__duration">
            {`${Math.floor(props.movie.duration / 60)}ч ${
              props.movie.duration % 60
            }м`}
          </p>
        </div>
      </div>
    </article>
  );
}
export default MoviesCard;
