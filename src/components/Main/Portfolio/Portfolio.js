// import { Link } from 'react-router-dom';
import './Portfolio.css';
import '../Main.css';

function portfolio(props) {
    return (
        <section className='portfolio'>
            <div className='portfolio__title-box'>
                <h2 className='portfolio__portfolio'>Портфолио</h2>
                <div className='portfolio__links'>
                    <div className='portfolio__link-box'>
                        <a
                            className='portfolio__link'
                            href='https://volcharamastering.github.io/russian-travel_vmstr/'>
                            Статичный сайт
                        </a>
                        <a
                            className='portfolio__link-arrow'
                            href='https://volcharamastering.github.io/russian-travel_vmstr/'> ↗
                        </a>
                    </div>
                    <div className='portfolio__link-box'>
                        <a
                            className='portfolio__link'
                            href='https://volcharamastering.github.io/mesto_vmstr/'>
                            Адаптивный сайт
                        </a>
                        <a
                            className='portfolio__link-arrow'
                            href='https://volcharamastering.github.io/mesto_vmstr/'>↗
                        </a>
                    </div>
                    <div className='portfolio__link-box'>
                        <a
                            className='portfolio__link'
                            href='https://mesto.vmstr.nomoredomains.icu'>
                            Одностраничное приложение
                        </a>
                        <a
                            className='portfolio__link-arrow'
                            href='https://mesto.vmstr.nomoredomains.icu'>↗
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default portfolio;