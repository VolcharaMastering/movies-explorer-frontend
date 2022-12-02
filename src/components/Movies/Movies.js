
import React, { useEffect } from "react";

import './Movies.css'
import SearchForm from "../SearchForm/SearchForm.js";
// import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader.js"


function Movies(props) {
    const [movies, setMovies] = React.useState([]);
    const [moviesToShow, setMoviesToShow] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [searchMovie, setSearchMovie] = React.useState('');
    const [onSlider, setOnSlider] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [showMoreButton, setShowMoreButton] = React.useState(false);
    // let handleFlag = false;


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

    function loopWithSlice(start, end) {
        const slicedMovies = filteredMovies.slice(start, end);
        console.log(slicedMovies, filteredMovies, moviesToShow)
        setMoviesToShow(previosMovies => [...previosMovies, ...slicedMovies]);
        setLoading(false);
        if (filteredMovies.length > moviesToShow.length){
            console.log(filteredMovies.length, moviesToShow.length)
            setShowMoreButton(true);
        }else{
            console.log(filteredMovies.length, moviesToShow.length)
            setShowMoreButton(false);
        }
    };

    const findInAll = () => {
        const filmsFound = movies.filter(film =>
            film.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.description.toLowerCase().includes(searchMovie.toLowerCase())
        );
        if (filmsFound.length===0){setNotFound(true)}else{setNotFound(false)};
        // console.log(filmsFound);
        return filmsFound;
    }
    const findInShort = () => {
        const filmsFound = movies.filter(film => (
            film.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.description.toLowerCase().includes(searchMovie.toLowerCase())) &&
            film.duration <= 40
        );
        if (filmsFound.length===0){setNotFound(true)}else{setNotFound(false)};
        return filmsFound;
    }

    useEffect(() => {
        setLoading(true);
        if (searchMovie.length === 0) {
            setMoviesToShow([]);
            setLoading(false);
            return;
        }
        console.log(searchMovie)
        if (onSlider) {
            getAllMoviesFromYaApi();
            setFilteredMovies(findInShort());
            setMoviesToShow([]);
        }
        else {
            getAllMoviesFromYaApi();
            setFilteredMovies(findInAll());
            setMoviesToShow([]);
        }
        loopWithSlice(0, props.moviesPerPage);
    }, [onSlider, searchMovie]);

    // const savedMovie = (gotMovie) => {
    //     const film = movies.find(movie => movie._id = gotMovie._id)
    //     film.saved = !film.saved;
    // }

    const handleShowMoreMovies = () => {
        loopWithSlice(props.moviesPerPage, props.moviesPerPage + props.addMovies);
        props.setMoviesPerPage(props.moviesPerPage + props.addMovies);
    };
    //----------------
    //=========================
    const handleFindFilm = (e) => {
        e.preventDefault();
        getSearchString(searchInput.current.value);
        // console.log(searchInput.current.value);
    };

    const handleToggleSlider = () => {
        setOnSlider(!onSlider);
    };
    const getSearchString = (val) => {
        setSearchMovie(val);
    }
    return (
        <main className="movies">
            <section className="search-form">
                <SearchForm
                    searchInput={searchInput}
                    searchMovie={setSearchMovie}
                    handleFindFilm={handleFindFilm}
                    onSlider={onSlider}
                    toggleSlider={handleToggleSlider}
                />
            </section>
            {/* <section className="preloader">
                <Preloader />
            </section> */}

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
        </main >
    );
}

export default Movies;