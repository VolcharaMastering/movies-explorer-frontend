import './Promo.css';
import '../Main.css';

function Promo(props){

    return(
        <div className="promo">
            <h1 className='main__title promo-main__title_margin'>Учебный проект студента факультета Веб-разработки.</h1>
            <ul className='promo__buttons-area'>
                <li className='promo__button'>О проекте</li>
                <li className='promo__button'>Технологии</li>
                <li className='promo__button'>Студент</li>
            </ul>
        </div>
    );
}
export default Promo;