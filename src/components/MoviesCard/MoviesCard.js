import React from "react";
import './MoviesCard.css'

function MoviesCard(props) {
    const [like, setLike] = React.useState(props.movie.isSaved);
    const handleToggleMovie = () => {
        if (props.movie.isSaved) {
            setLike(false);
            props.movie.isSaved =false;
            props.delMovie(props.movie.id);
        } else {
            setLike(true);
            props.movie.isSaved =true;
            props.savedMovie(props.movie);
        }

    }
    const pathname = window.location.pathname;
    return (
        <article
            className="movies-card">
            <div className="movies-card__image-box">
                <a className="movies-card__image-link"
                    href={props.movie.trailerLink}
                    target="_blank" rel="noreferrer">
                    <img
                        className="movies-card__image"
                        src={`https://api.nomoreparties.co${props.movie.image.url}`}
                        alt={`Постер к фильму: ${props.movie.nameRU}`}
                    />
                </a>
                <div className={
                    `${(like && pathname !== '/saved-movies') ?
                        'movies-card__saved-position' : 'movies-card__save-position'}`
                }>
                    <button
                        className={
                            pathname !== '/saved-movies' ?
                                (`${like ? 'movies-card__saved' : 'movies-card__save'}`) :
                                'movies-card__unsave'
                        }
                        type="button"
                        onClick={handleToggleMovie}
                        aria-label="Сохранить"
                    >
                        {`${like ? '' : 'Сохранить'}`}
                    </button>
                </div>
            </div>
            <div className="movies-card__caption">
                <h2 className="movies-card__name">{props.movie.nameRU}</h2>
                <div className="movies-card__duration-box">
                    <p
                        className="movies-card__duration">
                        {`${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`}
                    </p>
                </div>
            </div>
        </article >
    );
}
export default MoviesCard;