import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const handleDelete = () => {
    props.delMovie(props.movie._id);
  };
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
            src={props.movie.image}
            alt={`Постер к фильму: ${props.movie.nameRU}`}
          />
        </a>
        <div className="movies-card__save-position">
          <button
            className="movies-card__unsave"
            type="button"
            onClick={handleDelete}
            aria-label="Сохранить"
          ></button>
        </div>
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
