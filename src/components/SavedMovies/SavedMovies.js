
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
    const [filteredMovies, setFilteredMovies] = React.useState(localStorage.getItem('foundSavedMovies') || []);
    const [onSlider, setOnSlider] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [error, setError] = React.useState(false);
    // const [renderFlag, setRenderFlag] = React.useState(false);

    //=======check movies from localstorage or maindb=======
    const foundMovies = JSON.parse(localStorage.getItem('foundSavedMovies'));
    const searchState = JSON.parse(localStorage.getItem('savedSearchState'));

    useEffect(() => {
        getSavedMovies();
        if (!foundMovies || foundMovies.length === 0) {
            setMoviesToShow(movies);
        }
        else {
            if (!searchState.sliderState) { setOnSlider(searchState.sliderState) };
            setFilteredMovies(foundMovies);
            setMoviesToShow(foundMovies);
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
                if (!foundMovies) {
                    setMoviesToShow(filteredMovies.filter(film => film.movieId !== movieId))
                } else { getSavedMovies(); }

            })
            .catch((err) => {
                setError(true);
            });
    }
    /////------------------------------------------------------------------///////
    // console.log(foundMovies, searchState);

    ///-----------render movies -----------////
    useEffect(() => {
        setMoviesToShow(movies);
        createStorage();
        setLoading(false);
    }, [movies]);
    /////------------------------------------------------------------------///////

   ////------------find process------------/////////////
   const findInShort = () => {
    // getSavedMovies();
    // setFilteredMovies([]);
    const filmsFound = movies.filter(film => (
        film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
        film.description.toLowerCase().includes(request.toLowerCase())) &&
        film.duration <= 40
    );
    if (filmsFound.length === 0 && request.length > 0) { setNotFound(true) } else { setNotFound(false) };
    setFilteredMovies(filmsFound);
    setMoviesToShow(filmsFound);
    // setRenderFlag(!renderFlag);
}

const findInAll = () => {
    // getSavedMovies();
    // setFilteredMovies([]);
    const filmsFound = movies.filter(film =>
        film.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        film.nameEN.toLowerCase().includes(request.toLowerCase()) ||
        film.description.toLowerCase().includes(request.toLowerCase())
    );
    if (filmsFound.length === 0 && request.length > 0) { setNotFound(true) } else { setNotFound(false) };
    setFilteredMovies(filmsFound);
    setMoviesToShow(filmsFound);
    // setRenderFlag(!renderFlag);
}


useEffect(() => {
    if (!request || request.length === 0) {
        console.log("return"); return
    };
    setLoading(true);
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

    // console.log(localStorage.getItem('savedSearchState'));
    // console.log(localStorage.getItem('foundSavedMovies'));
};


////--------- reaction on buttons click-----------//////
const handleFindFilm = (request) => {
    setRequest(request);
};

const handleToggleSlider = () => {
    setOnSlider(!onSlider);
};
/////------------------------------------------------------------------///////

    // console.log(movies, 'filter', filteredMovies, 'request',request , 'onSlider', onSlider)
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
                                savedMovies={movies}
                                delMovie={delMovie}
                                getSavedMovies={getSavedMovies}
                            />
                }
            </section>
        </main >
    );
}

export default SavedMovies;