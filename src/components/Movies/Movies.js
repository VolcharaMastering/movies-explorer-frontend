
import React, { useEffect } from "react";

import './Movies.css'
import SearchForm from "../SearchForm/SearchForm.js";
// import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";
import Preloader from "../Preloader/Preloader.js";
import { CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import { FoundFilmsContext} from '../../contexts/FoundFilmsContext.js';
import { SliderStateContext} from '../../contexts/SliderStateContext.js';



function Movies(props) {
    const user = React.useContext(CurrentUserContext);
    const [movies, setMovies] = React.useState([]);
    const [moviesToShow, setMoviesToShow] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [onSlider, setOnSlider] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [showMoreButton, setShowMoreButton] = React.useState(false);

    //=======creating an array of movies=======
    const searchInput = React.useRef('');

    const getAllMoviesFromYaApi = () => {
        moviesApi.getMovies()
            .then((data) => {
                setMovies(data);
                setError(false);
            })
            .catch((err) => {
                setError(true);
            });
    }
    const saveMovie = (savedMovie) => {
        mainApi.setMovie(savedMovie)
            .then((data) => {
                setMovies(data);
                setError(false);
            })
            .catch((err) => {
                setError(true);
            });
    }

    function loopWithSlice(start, end) {
        const slicedMovies = filteredMovies.slice(start, end);
        console.log(slicedMovies, filteredMovies, moviesToShow)
        setMoviesToShow(previosMovies => [...previosMovies, ...slicedMovies]);
        if (filteredMovies.length > moviesToShow.length) {
            console.log(filteredMovies.length, moviesToShow.length)
            setShowMoreButton(true);
        } else {
            console.log(filteredMovies.length, moviesToShow.length)
            setShowMoreButton(false);
        }
    };

    const findInAll = (request) => {
        const filmsFound = movies.filter(film =>
            film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
            film.description.toLowerCase().includes(request.toLowerCase())
        );
        if (filmsFound.length === 0) { setNotFound(true) } else { setNotFound(false) };
        return filmsFound;
    }
    const findInShort = (request) => {
        const filmsFound = movies.filter(film => (
            film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
            film.description.toLowerCase().includes(request.toLowerCase())) &&
            film.duration <= 40
        );
        if (filmsFound.length === 0) { setNotFound(true) } else { setNotFound(false) };
        return filmsFound;
    }

    const findMovies = (request) => {
        if (onSlider) {
            getAllMoviesFromYaApi();
            setFilteredMovies(findInShort(request));
            setMoviesToShow([]);
        }
        else {
            getAllMoviesFromYaApi();
            setFilteredMovies(findInAll(request));
            setMoviesToShow([]);
        }
        loopWithSlice(0, props.moviesPerPage);
    }

    useEffect(() => {
        setLoading(false);
    }, [moviesToShow]);
    
    const handleShowMoreMovies = () => {
        loopWithSlice(props.moviesPerPage, props.moviesPerPage + props.addMovies);
        props.setMoviesPerPage(props.moviesPerPage + props.addMovies);
    };
    //----------------
    //=========================
    const handleFindFilm = (request) => {
        setLoading(true);
        findMovies(request);
        console.log("but", request);
    };

    const handleToggleSlider = () => {
        setOnSlider(!onSlider);
    };



    return (
        <main className="movies">
            <FoundFilmsContext.Provider value={moviesToShow}>
            <SliderStateContext.Provider value={onSlider}>
            <section className="search-form">
                <SearchForm
                    searchInput={searchInput}
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
                            />
                }
            </section>
            </SliderStateContext.Provider>
            </FoundFilmsContext.Provider>
        </main >
    );
}

export default Movies;