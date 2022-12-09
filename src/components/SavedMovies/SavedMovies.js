
import React, { useEffect } from "react";

import './SavedMovies.css'
import SearchForm from "./SearchForm/SearchForm.js";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import mainApi from "../../utils/MainApi.js";
import Preloader from "../Preloader/Preloader.js";


function SavedMovies(props) {
    const [movies, setMovies] = React.useState([]);
    const [moviesToShow, setMoviesToShow] = React.useState([]);
    const [request, setRequest] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [onSlider, setOnSlider] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [error, setError] = React.useState(false);
    // const [renderFlag, setRenderFlag] = React.useState(false);

    //=======check movies from localstorage or maindb=======
    const foundMovies = localStorage.getItem('foundSavedMovies');
    const searchState = localStorage.getItem('savedSearchState');
    useEffect(() => {
        if (!foundMovies || JSON.parse(foundMovies).length === 0) {
            getSavedMovies();
        }
        else {
            setOnSlider(JSON.parse(searchState).sliderState);
            setFilteredMovies(JSON.parse(foundMovies));
        };
    }, []);
    /////------------------------------------------------------------------///////


    ///---------database cals---------------////////
    const getSavedMovies = () => {
        mainApi.getMovies()
            .then((data) => {
                setError(false);
                setMovies(data);
            })
            .catch((err) => {
                setError(true);
            });
    }
    const delMovie = (movieId) => {
        mainApi.delMovie(movieId)
            .then((data) => {
                if (!filteredMovies || filteredMovies.length === 0) {
                    getSavedMovies();
                } else {
                    setMoviesToShow(filteredMovies.filter(film => film.movieId !== movieId));
                }

            })
            .catch((err) => {
                setError(true);
            });
    }
    /////------------------------------------------------------------------///////

    ///-----------render movies -----------////
    useEffect(() => {
        if (!filteredMovies || filteredMovies.length === 0) {
            setMoviesToShow(movies);
        } else {
            setMoviesToShow(filteredMovies);
            createStorage();
        }
        setLoading(false);
    }, [filteredMovies, movies]);
    /////------------------------------------------------------------------///////

    ////------------find process------------/////////////
    const findInShort = () => {
        const filmsFound = movies.filter(film => (
            film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
            film.description.toLowerCase().includes(request.toLowerCase())) &&
            film.duration <= 40
        );
        if (filmsFound.length === 0 && request.length > 0) { setNotFound(true) } else { setNotFound(false) };
        setFilteredMovies(filmsFound);
    }

    const findInAll = () => {
        const filmsFound = movies.filter(film =>
            film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
            film.description.toLowerCase().includes(request.toLowerCase())
        );
        if (filmsFound.length === 0 && request.length > 0) { setNotFound(true) } else { setNotFound(false) };
        setFilteredMovies(filmsFound);
    }


    useEffect(() => {
        if (!request || request.length === 0) {
            return
        };
        setLoading(true);
        getSavedMovies();
        if (onSlider) {
            setMoviesToShow([]);
            findInShort();
        }
        else {
            setMoviesToShow([]);
            findInAll();
        }
    }, [request, onSlider]);
    /////------------------------------------------------------------------///////
    const createStorage = () => {
        localStorage.setItem('foundSavedMovies', JSON.stringify(filteredMovies));
        const searchState = { 'savedRequest': request, 'sliderState': onSlider };
        localStorage.setItem('savedSearchState', JSON.stringify(searchState));
    };


    ////--------- reaction on buttons click-----------//////
    const handleFindFilm = (request) => {
        setRequest(request);
    };

    const handleToggleSlider = () => {
        setOnSlider(!onSlider);
    };

    /////------------------------------------------------------------------///////


    return (
        <main className="saved-movies">
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
                                delMovie={delMovie}
                            />
                }
            </section>
        </main >
    );
}

export default SavedMovies;