/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './SearchForm.css';
import '../Movies/Movies.js';
import Slider from './Slider/Slider.js';


function SearchForm(props) {

    return (
        <>
            <form 
            className='search-form__form'
            onSubmit={e => props.handleFindFilm(e)}
            >
                <div className='search-form__input-box'>
                    <input
                        className='search-form__input'
                        type="text"
                        placeholder="Фильм"
                        id="search-form"
                        ref={props.searchInput}
                        name="search"
                        onChange={e => props.searchMovie(e.target.value)}
                        required
                        maxLength="400"
                    />
                    <button
                        className="search-form__button"
                        type='submit'
                        aria-label='search'
                    >
                        Поиск
                    </button>
                </div>
                <Slider
                    isOn={props.onSlider}
                    toggleSlider={props.toggleSlider}
                    onColor="#3DDC84"
                />
            </form>
        </>
    );

};

export default SearchForm;