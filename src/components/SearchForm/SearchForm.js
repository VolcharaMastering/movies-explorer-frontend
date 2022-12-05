/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useForm } from "react-hook-form";
import './SearchForm.css';
import '../Movies/Movies.js';
import Slider from './Slider/Slider.js';
import { SearchStringContext } from '../../contexts/SearchStringContext.js';


function SearchForm(props) {
    const contextString = React.useContext(SearchStringContext);
    const [searchString, setSearchString] = React.useState('');
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ mode: "onChange" });

    const onSubmit = (inputText) => {
        setSearchString(inputText.search);
        props.handleFindFilm(inputText.search);
    }
    return (
        <SearchStringContext.Provider value={searchString}>
            <form
                className='search-form__form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='search-form__input-box'>
                    <input
                        {...register("search", {
                            required: "Нужно ввести ключевое слово",
                        })}
                        defaultValue={contextString || ''}
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
            </SearchStringContext.Provider>
    );

};

export default SearchForm;