
import React, { useEffect } from "react";

import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm.js";
// import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "../Movies/moviesList.json";


function SavedMovies(props) {
    const [moviesToShow, setMoviesToShow] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    // const [savedMovies, setSavedMovies] = React.useState([]);
    const [searchMovie, setSearchMovie] = React.useState('');
    const [onSlider, setOnSlider] = React.useState(false);
    let handleFlag = false;

    //=======creating an array of movies=======

    function loopWithSlice(start, end) {
        const slicedMovies = (handleFlag ? filteredMovies.slice(start, end) : savedMovies.slice(start, end));
        setMoviesToShow(previosMovies => [...previosMovies, ...slicedMovies]);
        updateFlag();
    };
    // const getSavedMovies=()=>{
    // setSavedMovies(movies.filter(film =>film.saved === true));
    // };
    // getSavedMovies();
    const savedMovies=movies.filter(film =>film.saved === true);
    // useEffect(()=>{
    //     getSavedMovies();
    // },[movies]);
    

    const updateFlag = () => {
        handleFlag = false;
    }
    const findInAll = () => {
        const filmsFound = savedMovies.filter(
            film =>film.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
                film.nameEN.toLowerCase().includes(searchMovie.toLowerCase()) ||
                film.description.toLowerCase().includes(searchMovie.toLowerCase())
        );
        return filmsFound;
    }
    const findInShort = () => {
        const filmsFound = savedMovies.filter(film =>
            (film.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
                film.nameEN.toLowerCase().includes(searchMovie.toLowerCase()) ||
                film.description.toLowerCase().includes(searchMovie.toLowerCase())) &&
            film.duration <= 120
        );
        return filmsFound;
    }
    const getShort = () => {
        setFilteredMovies(savedMovies.filter( film =>film.duration <= 120)
        );
    }

    useEffect(() => {
        setMoviesToShow([]);
        switch (true) {
            case (onSlider && searchMovie.length > 0):
                handleFlag = true;
                setFilteredMovies(findInShort());
                break;
            case (onSlider && searchMovie.length === 0):
                handleFlag = true;
                getShort();
                break;
            case (!onSlider && searchMovie.length > 0):
                handleFlag = true;
                setFilteredMovies(findInAll());
                break;
            default:
                console.log('DEFAULT');
        }
        loopWithSlice(0, props.moviesPerPage);
    }, [props.changedWidth, onSlider, searchMovie]);

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
        getSearchString(e);
    };
    const handleToggleSlider = () => {
        setOnSlider(!onSlider);
    };
    const getSearchString = (e) => {
        setSearchMovie(e.target.value);
    }
    return (
        <main className="saved-movies">
            <section className="search-form">
                <SearchForm
                    searchMovie={getSearchString}
                    handleFindFilm={handleFindFilm}
                    onSlider={onSlider}
                    toggleSlider={handleToggleSlider}
                />
            </section>
            {/* <section className="preloader">
                <Preloader />
            </section> */}
            <section className="movies-list">
                <MoviesCardList
                    moviesToRender={moviesToShow}
                    moreMovies={handleShowMoreMovies}
                />
            </section>
        </main >
    );
}

export default SavedMovies;