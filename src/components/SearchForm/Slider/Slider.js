import React from 'react';
import './Slider.css';
import { SliderStateContext} from '../../../contexts/SliderStateContext.js';
import { SearchStringContext } from '../../../contexts/SearchStringContext.js';

const Slider = ({ isOn, onColor, toggleSlider }) => {
    const contextSlider = React.useContext(SliderStateContext);
    const contextString = React.useContext(SearchStringContext);
    return (
        <div className='search-slider'>
            <input
                checked={(contextString.length>0)? contextSlider : isOn}
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