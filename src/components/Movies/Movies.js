import React, { useEffect } from "react";

import './Movies.css'
import SearchForm from "../SearchForm/SearchForm.js";
// import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "./moviesList.json";


function Movies(props) {
    const [moviesToShow, setMoviesToShow] = React.useState([]);
    const [findMovie, setFindMovie] = React.useState('');
    const [onSlider, setOnSlider] = React.useState(false);
    const [filteredMovies, setFilteredMovies] = React.useState([]);

    React.useEffect(() => {
        setMoviesToShow([]);
        loopWithSlice(0, props.moviesPerPage);
    }, [props.changedWidth,onSlider,props.moviesPerPage]);
    //----------------
    //=======creating an array of movies=======
    function loopWithSlice (start, end){
        const slicedMovies = movies.slice(start, end);
        console.log(onSlider);
        if(!onSlider){
            setFilteredMovies(slicedMovies);
        }else{
            setFilteredMovies(slicedMovies.filter(film => film.duration <= 120));
        }
        setMoviesToShow(previosMovies => [...previosMovies, ...filteredMovies]);
    };

    const savedMovie = (gotMovie) => {
        const film=movies.find(movie=>movie._id = gotMovie._id)
            film.saved = !film.saved;
    }

    const handleShowMoreMovies = () => {
        loopWithSlice(props.moviesPerPage, props.moviesPerPage + props.addMovies);
        props.setMoviesPerPage(props.moviesPerPage + props.addMovies);
    };

    //=========================
    const handleFindFilm = (e) => {
        e.preventDefault();
        setFindMovie(e.target.value);
    }
    const handleToggleSlider = () => {
        setOnSlider(!onSlider);
    }
    return (
        <main className="movies">
            <section className="search-form">
                <SearchForm
                    handleFindFilm={handleFindFilm}
                    toggleSlider={handleToggleSlider}
                />
            </section>
            {/* <section className="preloader">
                <Preloader />
            </section> */}
            <section className="movies-list">
                <MoviesCardList
                    findMovie={findMovie}
                    moviesToRender={moviesToShow}
                    moreMovies={handleShowMoreMovies}
                    savedMovie={savedMovie}
                />
            </section>
        </main >
    );
}

export default Movies;