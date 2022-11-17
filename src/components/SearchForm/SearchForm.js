/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './SearchForm.css';
import '../Movies/Movies.js';
import Slider from './Slider/Slider.js';


function SearchForm(props) {

    const handleSubmitForm = (e) => {
        e.preventDefault();
        props.handleFindFilm(e);
    }

    return (
        <>
            <form className='search-form__form'>
                <div className='search-form__input-box'>
                    <input
                        className='search-form__input'
                        type="text"
                        placeholder="Фильм"
                        id="search-form"
                        name="search"
                        onChange={props.searchMovie}
                        required
                        maxLength="400"
                    />
                    <button
                        className="search-form__button"
                        type="button"
                        aria-label='search'
                        onClick={handleSubmitForm}
                    >
                        Поиск
                    </button>
                </div>
                <Slider
                    isOn={props.onSlider}
                    handleToggle={props.toggleSlider}
                    onColor="#3DDC84"
                />
            </form>
        </>
    );

};

export default SearchForm;