import React, { useEffect } from "react";

import './Movies.css'
import SearchForm from "../SearchForm/SearchForm.js";
// import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "./moviesList.json";


function Movies(props) {
    const [searchFilm, findSearchFilm] = React.useState('');
    const [addMovies, setAddMovies] = React.useState(Number);
    const [moviesPerPage, setMoviesPerPage] = React.useState(Number);
    const [chengedWidth, setChangedWidth] = React.useState('');
    const [moviesToShow, setMoviesToShow] = React.useState([]);


    //----here is checking window resizing------
    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);
    });

    const checkWindowSize = () => {
        //-----making constants depending on window width-------- 
        switch (true) {
            case (window.innerWidth <= 649):
                setChangedWidth('mobile');
                setAddMovies(3)
                setMoviesPerPage(5);
                break;
            case (window.innerWidth <= 959):
                setChangedWidth('tablet');
                setAddMovies(4);
                setMoviesPerPage(8);
                break;
            default:
                setChangedWidth('monitor');
                setAddMovies(6);
                setMoviesPerPage(12);
        }
    };
    React.useEffect(() => {
        console.log("changed add=", addMovies, "all=", moviesPerPage);
        setMoviesToShow([]);
        loopWithSlice(0, moviesPerPage);
    }, [chengedWidth]);
    //----------------
    //=======creating an array of movies=======
    const loopWithSlice = (start, end) => {
        const slicedMovies = movies.slice(start, end);
        setMoviesToShow(previosMovies => [...previosMovies, ...slicedMovies]);
        console.log(moviesToShow);
        
    };


    const handleShowMoreMovies = () => {
        loopWithSlice(moviesPerPage, moviesPerPage + addMovies);
        setMoviesPerPage(moviesPerPage + addMovies);
    };

    useEffect(() => {
        checkWindowSize();
        loopWithSlice(0, moviesPerPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //=========================
    const handleFindFilm = (e) => {
        e.preventDefault();
        findSearchFilm(e.target.value);
    }

    return (
        <main className="movies">
            <section className="search-form">
                <SearchForm
                    handleFindFilm={handleFindFilm}
                    onClick={handleShowMoreMovies}
                />
            </section>
            {/* <section className="preloader">
                <Preloader />
            </section> */}
            <section className="movies-list">
                <MoviesCardList
                    searchFilm={searchFilm}
                    moviesToRender={moviesToShow}
                    moreMovies={handleShowMoreMovies}
                />
            </section>
        </main >
    ); 
}

export default Movies;