import React, { useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {
  const [renderingMovie, setRenderingMovie] = React.useState([]);
  useEffect(() => {
    props.getSavedMovies();
  }, [props.loading]);

  useEffect(() => {
    props.moviesToRender.forEach((film) => {
      if (props.savedMovies.find((saved) => saved.movieId === film.id)) {
        film.isSaved = true;
      } else {
        film.isSaved = false;
      }
    });
    setRenderingMovie(props.moviesToRender);
  }, [props.savedMovies, props.moviesToRender]);
  return (
    <>
      <div className="movies-list__box">
        <section className="movies-list__list">
          {renderingMovie.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              savedMovie={props.savedMovie}
              delMovie={props.delMovie}
            />
          ))}
        </section>
      </div>
      <div className="movies-list__more">
        <div
          className={`movies-list__more-button 
                ${props.showMoreButton ? "movies-list__more-button_show" : ""}
                `}
          onClick={props.moreMovies}
        >
          Ещё
        </div>
      </div>
    </>
  );
}

export default MoviesCardList;
