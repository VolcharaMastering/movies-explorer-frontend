import React from "react";
import './MoviesCard.css'

function MoviesCard(props) {

    // const moviesCardSaveButtonClass = (`movies-card__save ${isSaved ? 'moviesCard__save_active' : ''}`);

    return (
        <article className="movies-card">
            <div className="movies-card__image-box">
                <img
                    className="movies-card__image"
                    src={props.image}
                    alt={`Постер к фильму: ${props.nameRU}`}
                />
                <div className="movies-card__save-position">
                    <div
                        className="movies-card__save"
                        type="button"
                        // onClick={handleMovieSave} 
                        aria-label="Сохранить">Сохранить
                    </div>
                </div>
            </div>
            <div className="movies-card__caption">
                <h2 className="movies-card__name">{props.nameRU}</h2>
                <div className="movies-card__duration-box">
                    <p className="movies-card__duration">{`${Math.floor(props.duration / 60)}ч ${props.duration % 60}м`}</p>
                    </div>
            </div>
        </article>
    );
}
export default MoviesCard;