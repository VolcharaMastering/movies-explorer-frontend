import React from 'react';
import './SearchForm.css';
import '../Movies/Movies.js';
import Slider from './Slider/Slider.js';


function Techs(props) {
    const [findFilm, setFindFilm] = React.useState('');
    const [onSlider, setOnSlider] = React.useState(false);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        props.handleFindFilm(findFilm);
    }
    const handleChange = (e) => {
        setFindFilm(e.target.value);
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
                        onChange={handleChange}
                        required
                        minLength="2"
                        maxLength="400"
                    />
                    <button
                        className="search-form__button"
                        type="submit"
                        aria-label='search'
                        onSubmit={handleSubmitForm}
                    >
                        Поиск
                    </button>
                </div>
                <Slider
                    isOn={onSlider}
                    onColor="#3DDC84"
                    handleToggle={() => setOnSlider(!onSlider)}
                />
            </form>
        </>
    );

};

export default Techs;