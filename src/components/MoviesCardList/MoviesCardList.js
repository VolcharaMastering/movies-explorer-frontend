import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard.js";
import { FoundFilmsContext } from '../../contexts/FoundFilmsContext.js';

function MoviesCardList(props) {
    const contextFilms = React.useContext(FoundFilmsContext);
    console.log("button", props.showMoreButton)
    return (
        <>
            <div className='movies-list__box'>
                <section className="movies-list__list">
                    {(contextFilms.length > 0) ?
                        contextFilms.map((movie) => (
                            <MoviesCard
                                key={movie._id}
                                movie={movie}
                            // savedMovie={props.savedMovie}
                            />
                        ))
                        :
                        props.moviesToRender.map((movie) => (
                            <MoviesCard
                                key={movie._id}
                                movie={movie}
                            // savedMovie={props.savedMovie}
                            />
                        ))
                    }
                </section>
            </div>
            <div className='movies-list__more'>
                <div
                    className={`movies-list__more-button 
                ${props.showMoreButton ? 'movies-list__more-button_show' : ''}
                `}
                    onClick={props.moreMovies}
                >Ещё</div>
            </div>
        </>
    )
}

export default MoviesCardList;