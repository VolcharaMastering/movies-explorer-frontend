// import { Link } from 'react-router-dom';
import './AboutMe.css';
import '../Main.css';

import avatar from '../../../images/avatar.jpg';

function AboutMe(props) {
    return (
        <>
            <div className='aboutme__title-box'>
                <h2 className='main__subtitle aboutme-main__subtitle_margin'>Студент</h2>
                <div className='aboutme__description'>
                    <div className='aboutme__text-box'>
                        <h1 className='main__title aboutme-main__title_margin'>Алексей</h1>
                        <h3 className='aboutme__about'>Фронтенд-разработчик, 34 года</h3>
                        <p className='aboutme__text'>
                            Уроженец города Москвы. Мой учебный путь весь прошел в г. Москве:
                            школа 1285, Университет связи и информатики (МТУСИ). В процессе
                            обучения делал краткий перерыв на годик на службу в дивизии им. Дзержинского.
                            Женат, есть дочь, 3 кошки и аквариум с десятком рыбок. Увлекаюсь: туризмом,
                            исторической реконструкцией, рукопашным боем, музыкой (рок-металл направления),
                            велосипеды, машины, горные и беговые лыжи. с 2009 года работал во ФГУП НИИ "Квант".
                            Там познал дзен работы в linux, кодинья на "Perl", работе с "mysql". В практикум пришёл за
                            развитием и познанием "современных реалий в IT".
                        </p>
                        <a
                            className='aboutme__github'
                            href='https://github.com/VolcharaMastering?tab=repositories'
                            target="_blank" rel="noreferrer">
                            Github
                        </a>
                    </div>
                    <div className='aboutme__photo-box'>
                        <img className='aboutme__img' alt='Фотография в портфолио' src={avatar} />
                    </div>
                </div>
            </div>
        </>
    );

};

export default AboutMe;