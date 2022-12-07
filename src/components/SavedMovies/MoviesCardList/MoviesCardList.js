import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {

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