
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
    const [showButton, setShowButton] = React.useState(false);
    // let handleFlag = false;


    //=======creating an array of movies=======
    const searchInput = React.useRef('');
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
        const slicedMovies = filteredMovies.slice(start, end);
        console.log(slicedMovies, filteredMovies, moviesToShow)
        setMoviesToShow(previosMovies => [...previosMovies, ...slicedMovies]);
    };

    const findInAll = () => {
        const filmsFound = movies.filter(film =>
            film.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.nameEN.toLowerCase().includes(searchMovie.toLowerCase()) ||
            film.description.toLowerCase().includes(searchMovie.toLowerCase())
        );
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
        return filmsFound;
    }

    useEffect(() => {
        if (searchMovie.length === 0) {
            setMoviesToShow([]);
            return;
        }
        console.log(searchMovie)
        if (onSlider) {
            setFilteredMovies(findInShort());
            setMoviesToShow([]);
        }
        else {
            setFilteredMovies(findInAll());
            setMoviesToShow([]);
        }
        loopWithSlice(0, props.moviesPerPage);
    }, [onSlider, searchMovie]);
    // }, [onSlider]);

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
        getSearchString(searchInput.current.value);
        console.log(searchInput.current.value);
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
                <MoviesCardList
                    moviesToRender={moviesToShow}
                    moreMovies={handleShowMoreMovies}
                    showButton={showButton}
                />
            </section>
        </main >
    );
}

export default Movies;