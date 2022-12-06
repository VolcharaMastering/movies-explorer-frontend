import React from 'react';
import './Slider.css';

const Slider = ({ isOn, onColor, toggleSlider }) => {
    return (
        <div className='search-slider'>
            <input
                checked={isOn}
                onChange={toggleSlider}
                className="search-slider__checkbox"
                id={`search-slider__new`}
                type="checkbox"
            />
            <label
                style={{ background: isOn && onColor }}
                className="search-slider__label"
                htmlFor={`search-slider__new`}
            >
                <span className={`search-slider__button`} />
            </label>
            <p className='search-slider__text'>Короткометражки</p>
        </div>
    );
};

export default Slider;