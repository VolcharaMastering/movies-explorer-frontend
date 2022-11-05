import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {
    console.log('Got in cardList', props.moviesToRender );

    return (
        <>
            <div className='movies-list__box'>
                <section className="movies-list__list">
                    {props.moviesToRender.map((movie) => (  
                        <MoviesCard
                            key={movie._id}
                            duration={movie.duration}
                            description={movie.description}
                            image={movie.image}
                            nameRU={movie.nameRU}
                            nameEN={movie.nameEN}
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