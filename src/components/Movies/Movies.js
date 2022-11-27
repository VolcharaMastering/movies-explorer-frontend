
import React, { useEffect } from "react";

import './Movies.css'
import SearchForm from "../SearchForm/SearchForm.js";
// import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";


function Movies(props) {
    const [movies, setMovies] = React.useState([]);
    const [moviesToShow, setMoviesToShow] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [searchMovie, setSearchMovie] = React.useState('');
    const [onSlider, setOnSlider] = React.useState(false);
    let handleFlag = false;


    //=======creating an array of movies=======

    const getAllMoviesFromYaApi = () => {
        moviesApi.getMovies()
            .then((data) => {
                setMovies(data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    function loopWithSlice(start, end) {
        const slicedMovies = (handleFlag ? filteredMovies.slice(start, end) : movies.slice(start, end));
        console.log(slicedMovies, handleFlag)
        setMoviesToShow(previosMovies => [...previosMovies, ...slicedMovies]);
        updateFlag();
    };

    const updateFlag = () => {
        handleFlag = false;

    }
    const findInAll = () => {
        const filmsFound = movies.filter(film =>
            film.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.description.toLowerCase().includes(searchMovie.toLowerCase())
        );
        return filmsFound;
    }
    const findInShort = () => {
        const filmsFound = movies.filter(film =>
            (film.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
                film.nameEN.toLowerCase().includes(searchMovie.toLowerCase()) ||
                film.description.toLowerCase().includes(searchMovie.toLowerCase())) &&
            film.duration <= 120
        );
        return filmsFound;
    }
    const getShort = () => {
        setFilteredMovies(movies.filter(film => film.duration <= 120));
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
    getAllMoviesFromYaApi();
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
        <main className="movies">
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

export default Movies;