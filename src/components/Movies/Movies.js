import React from "react";

import SearchForm from "./SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies(props) {
    const [searchFilm, findSearchFilm] = React.useState('');

    const findFilm = (e) => {
        findSearchFilm(e.target.value);
    }
    return (
        <main className="movies">
            <section className="search-form">
                <SearchForm
                    findFilm={findFilm}
                />
            </section>
            <section className="preloader">
                <Preloader />
            </section>
            <section className="movies-list">
                <MoviesCardList
                    searchFilm={searchFilm}
                />
            </section>
            <section className="movies-card">
                <MoviesCard />
            </section>
        </main >
    );
}

export default Movies;