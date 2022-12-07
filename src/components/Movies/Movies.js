/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";

import './Movies.css'
import SearchForm from "./SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";
import Preloader from "../Preloader/Preloader.js";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';



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

    //=======creating an array of movies=======

    const showedMovies = localStorage.getItem('showedMovies');
    const foundMovies = localStorage.getItem('foundMovies');
    const searchState = JSON.parse(localStorage.getItem('searchState'));
    useEffect(() => {
        getSavedMovies();
        if (foundMovies.length > 0) {
            setMoviesToShow(JSON.parse(showedMovies));
            setOnSlider(searchState.sliderState);
            setFilteredMovies(JSON.parse(foundMovies));
        }
    }, []);
    const getAllMoviesFromYaApi = () => {
        moviesApi.getMovies()
            .then((data) => {
                setError(false);
                setMovies(data);
            })
            .catch((err) => {
                setError(true);
            });
    }
    const saveMovie = (saving) => {
        mainApi.setMovie(saving)
            .then((data) => {
                getSavedMovies();
            })
            .catch((err) => {
                setError(true);
            });
    }
    const delMovie = (movieId) => {
        const delId=savedMovies.filter(saved => saved.movieId === movieId);
        mainApi.delMovie([delId[0]._id])
            .then((data) => {
                getSavedMovies();
            })
            .catch((err) => {
                setError(true);
            });
    }
    const getSavedMovies = () => {
        mainApi.getMovies()
            .then((data) => {
                setError(false);
                setSavedMovies(data);
            })
            .catch((err) => {
                setError(true);
            });
    }

    useEffect(() => {
        const slicedMovies = filteredMovies.slice(start, end);
        setMoviesToShow(previosMovies => [...previosMovies, ...slicedMovies]);
    }, [filteredMovies, start, end]);

    const addSaveToMovies=(filmsFound)=>{
        filmsFound.forEach(film => {
            if (savedMovies.find(saved => saved.movieId === film.id)) {
                film.isSaved = true;
            } else {
                film.isSaved = false;
            }
        });
    };
    const findInAll = () => {
        getAllMoviesFromYaApi();
        const filmsFound = movies.filter(film =>
            film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
            film.description.toLowerCase().includes(request.toLowerCase())
        );
        addSaveToMovies(filmsFound);
        if (filmsFound.length === 0 && request.length >0) { setNotFound(true) } else { setNotFound(false) };
        setFilteredMovies(filmsFound);
    }
    const findInShort = () => {
        getAllMoviesFromYaApi();
        const filmsFound = movies.filter(film => (
            film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
            film.description.toLowerCase().includes(request.toLowerCase())) &&
            film.duration <= 40
        );
        addSaveToMovies(filmsFound);
        if (filmsFound.length === 0 && request.length >0) { setNotFound(true) } else { setNotFound(false) };
        setFilteredMovies(filmsFound);
    }
    useEffect(() => {
        if (request.length === 0) { return };
        setLoading(true);
        if (onSlider) {
            setMoviesToShow([]);
            findInShort();
        }
        else {
            setMoviesToShow([]);
            findInAll();
        }
        setStart(0);
        setEnd(props.moviesPerPage);
    }, [request, onSlider]);

    useEffect(() => {
        if (filteredMovies.length > moviesToShow.length) {
            setShowMoreButton(true);
        } else {
            setShowMoreButton(false);
        }
        createStorage();
        setLoading(false);
    }, [moviesToShow]);

    const createStorage = () => {
        localStorage.setItem('showedMovies', JSON.stringify(moviesToShow));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        localStorage.setItem('foundMovies', JSON.stringify(filteredMovies));
        const searchState = { 'request': request, 'sliderState': onSlider };
        localStorage.setItem('searchState', JSON.stringify(searchState));
    };

    const handleShowMoreMovies = () => {
        setStart(props.moviesPerPage);
        setEnd(props.moviesPerPage + props.addMovies)
        props.setMoviesPerPage(props.moviesPerPage + props.addMovies);
    };
    //----------------

    //=========================
    const handleFindFilm = (request) => {
        setRequest(request);
    };

    const handleToggleSlider = () => {
        setOnSlider(!onSlider);
    };

    useEffect(() => {

    }, [savedMovies])
    const handleSaveMovie = (savingMovie) => {
        const saving = {
            "country": savingMovie.country,
            "director": savingMovie.director,
            "duration":savingMovie.duration,
            "year": savingMovie.year,
            "description": savingMovie.description,
            "image": `https://api.nomoreparties.co${savingMovie.image.url}`,
            "trailerLink": savingMovie.trailerLink,
            "thumbnail": `https://api.nomoreparties.co${savingMovie.image.formats.small.url}`,
            "owner": user.id,
            "movieId": savingMovie.id,
            "nameRU": savingMovie.nameRU,
            "nameEN": savingMovie.nameEN
        };
        saveMovie(saving);
    };



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
                {loading ?
                    <Preloader /> :
                    notFound ? <h2 className="movie__info-label">Ничего не найдено</h2> :
                        error ? <>
                            <h2 className="movie__info-label">Во время запроса произошла ошибка.</h2>
                            <h3 className="movie__info-label">Возможно, проблема с соединением или сервер недоступен.</h3>
                            <h3 className="movie__info-label">Подождите немного и попробуйте ещё раз </h3>
                        </> :
                            <MoviesCardList
                                moviesToRender={moviesToShow}
                                moreMovies={handleShowMoreMovies}
                                showMoreButton={showMoreButton}
                                savedMovie={handleSaveMovie}
                                delMovie={delMovie}
                            />
                }
            </section>
        </main >
    );
}

export default Movies;