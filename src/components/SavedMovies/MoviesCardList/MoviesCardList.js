import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {
    // const [renderingMovie, setRenderingMovie] = React.useState([]);
    // React.useEffect(() => {
    //     props.getSavedMovies();
    // }, [])

    // React.useEffect(() => {
    //     props.moviesToRender.forEach(film => {
    //         if (props.savedMovies.find(saved => saved.movieId === film.id)) {
    //             film.isSaved = true;
    //         } else {
    //             film.isSaved = false;
    //         }
    //     });
    //     setRenderingMovie(props.moviesToRender);
    // }, [props.savedMovies])
    // console.log(props.moviesToRender)
    return (
        <>
            <div className='movies-list__box'>
                <section className="movies-list__list">
                    {props.moviesToRender.map((movie) => (
                        <MoviesCard
                            key={movie._id}
                            movie={movie}
                            delMovie={props.delMovie}
                        />
                    ))
                    }
                </section>
            </div>
        </>
    )
}

export default MoviesCardList;