import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {

    return (
        <>
            <div className='movies-list__box'>
                <section className="movies-list__list">
                    {props.moviesToRender.map((movie) => (  
                        <MoviesCard
                            key={movie._id}
                            movie={movie}
                            // savedMovie={props.savedMovie}
                        />
                    ))}
                </section>
            </div>
            <div className='movies-list__more'>
                <div 
                className='movies-list__more-button'
                onClick={props.moreMovies}
                >Ещё</div>
            </div>
        </>
    )
}

export default MoviesCardList;