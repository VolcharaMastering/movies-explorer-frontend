import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";
import Preloader from "../Preloader/Preloader.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Movies(props) {
  const user = React.useContext(CurrentUserContext);
  const [movies, setMovies] = React.useState([]);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const [request, setRequest] = React.useState([]);
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [onSlider, setOnSlider] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showMoreButton, setShowMoreButton] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);

  //=======check movies from localstorage or maindb=======
  const showedMovies = localStorage.getItem("showedMovies");
  const foundMovies = localStorage.getItem("foundMovies");
  const searchState = localStorage.getItem("searchState");

  useEffect(() => {
    getAllMoviesFromYaApi();
    if (!searchState) {
      return;
    } else {
      if (request.length === 0) {
        setMoviesToShow(JSON.parse(showedMovies));
        setOnSlider(JSON.parse(searchState).sliderState);
        setFilteredMovies(JSON.parse(foundMovies));
        props.setMoviesPerPage(JSON.parse(showedMovies).length);
      }
    }
  }, []);

  /////------------------------------------------------------------------///////

  ///---------database cals---------------////////
  const getAllMoviesFromYaApi = () => {
    moviesApi
      .getMovies()
      .then((data) => {
        setError(false);
        setMovies(data);
      })
      .catch((err) => {
        setError(true);
      });
  };
  const saveMovie = (saving) => {
    mainApi
      .setMovie(saving)
      .then((data) => {
        getSavedMovies();
      })
      .catch((err) => {
        setError(true);
      });
  };
  const delMovie = (movieId) => {
    const delId = savedMovies.filter((saved) => saved.movieId === movieId);
    mainApi
      .delMovie([delId[0]._id])
      .then((data) => {
        getSavedMovies();
      })
      .catch((err) => {
        setError(true);
      });
  };
  const getSavedMovies = () => {
    mainApi
      .getMovies()
      .then((data) => {
        setError(false);
        setSavedMovies(data);
      })
      .catch((err) => {
        setError(true);
      });
  };
  /////------------------------------------------------------------------///////

  ///-----------render movies -----------////
  useEffect(() => {
    const slicedMovies = filteredMovies.slice(start, end);
    setMoviesToShow((previosMovies) => [...previosMovies, ...slicedMovies]);
  }, [filteredMovies, props.moviesPerPage, start, end]);

  useEffect(() => {
    if (filteredMovies.length > moviesToShow.length) {
      setShowMoreButton(true);
    } else {
      setShowMoreButton(false);
    }
    createStorage();
    setLoading(false);
  }, [moviesToShow]);
  /////------------------------------------------------------------------///////

  ////------------find process------------/////////////
  const findInShort = () => {
    const filmsFound = movies.filter(
      (film) =>
        (film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
          film.nameEN.toLowerCase().includes(request.toLowerCase())) &&
        film.duration <= 40
    );
    if (filmsFound.length === 0 && request.length > 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setFilteredMovies(filmsFound);
  };
  const findInAll = () => {
    const filmsFound = movies.filter(
      (film) =>
        film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        film.nameEN.toLowerCase().includes(request.toLowerCase())
    );
    if (filmsFound.length === 0 && request.length > 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setFilteredMovies(filmsFound);
  };

  useEffect(() => {
    if (request.length === 0) {
      return;
    }
    setLoading(true);
    if (onSlider) {
      setMoviesToShow([]);
      findInShort();
    } else {
      setMoviesToShow([]);
      findInAll();
    }
    setStart(0);
    setEnd(props.moviesPerPage);
  }, [request, onSlider]);
  /////------------------------------------------------------------------///////

  const createStorage = () => {
    localStorage.setItem("showedMovies", JSON.stringify(moviesToShow));
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
    if (request.length > 0) {
      const searchState = { request: request, sliderState: onSlider };
      localStorage.setItem("searchState", JSON.stringify(searchState));
    }
  };

  const handleShowMoreMovies = () => {
    setStart(props.moviesPerPage);
    setEnd(props.moviesPerPage + props.addMovies);
    props.setMoviesPerPage(props.moviesPerPage + props.addMovies);
  };

  const handleFindFilm = (request) => {
    props.checkWindowSize();
    setRequest(request);
  };

  const handleToggleSlider = () => {
    props.checkWindowSize();
    setOnSlider(!onSlider);
    if (request.length === 0 && searchState) {
      setRequest(JSON.parse(searchState).request);
    }
  };
  /////------------------------------------------------------------------///////

  /////----------saving-liking movies-----------////////
  const handleSaveMovie = (savingMovie) => {
    const saving = {
      country: savingMovie.country,
      director: savingMovie.director,
      duration: savingMovie.duration,
      year: savingMovie.year,
      description: savingMovie.description,
      image: `https://api.nomoreparties.co${savingMovie.image.url}`,
      trailerLink: savingMovie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${savingMovie.image.formats.thumbnail.url}`,
      owner: user.id,
      movieId: savingMovie.id,
      nameRU: savingMovie.nameRU,
      nameEN: savingMovie.nameEN,
    };
    saveMovie(saving);
  };
  /////------------------------------------------------------------------///////

  return (
    <main className="movies">
      <section className="search-form">
        <SearchForm
          handleFindFilm={handleFindFilm}
          onSlider={onSlider}
          toggleSlider={handleToggleSlider}
        />
      </section>

      <section className="movies-list">
        {loading ? (
          <Preloader />
        ) : notFound ? (
          <h2 className="movie__info-label">Ничего не найдено</h2>
        ) : error ? (
          <>
            <h2 className="movie__info-label">
              Во время запроса произошла ошибка.
            </h2>
            <h3 className="movie__info-label">
              Возможно, проблема с соединением или сервер недоступен.
            </h3>
            <h3 className="movie__info-label">
              Подождите немного и попробуйте ещё раз{" "}
            </h3>
          </>
        ) : (
          <MoviesCardList
            loading={loading}
            moviesToRender={moviesToShow}
            moreMovies={handleShowMoreMovies}
            showMoreButton={showMoreButton}
            getSavedMovies={getSavedMovies}
            savedMovies={savedMovies}
            savedMovie={handleSaveMovie}
            delMovie={delMovie}
          />
        )}
      </section>
    </main>
  );
}

export default Movies;
