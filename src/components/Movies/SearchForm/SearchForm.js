/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useForm } from "react-hook-form";
import './SearchForm.css';
import '../Movies.js';
import Slider from './Slider/Slider.js';


function SearchForm(props) {
    let savedRequest = '';
    const searchState = localStorage.getItem('searchState');
    if (!searchState) {
        savedRequest = '';
    } else { savedRequest = JSON.parse(searchState).request }

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ mode: "onChange" });

    const onSubmit = (inputText) => {
        props.handleFindFilm(inputText.search);
    }
    return (
        <form
            className='search-form__form'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='search-form__input-box'>
                <input
                    {...register("search", {
                        required: "Нужно ввести ключевое слово",
                    })}
                    defaultValue={savedRequest}
                    className='search-form__input'
                    placeholder="Фильм"
                    id="search-form"
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
            <span className={
                `search-form__valid-error 
                        ${errors.search ? 'search-form__valid-error_active' : ''}`
            }>
                {errors?.search && errors?.search?.message}</span>
            <Slider
                isOn={props.onSlider}
                toggleSlider={props.toggleSlider}
                onColor="#3DDC84"
            />
        </form>
    );

};

export default SearchForm;