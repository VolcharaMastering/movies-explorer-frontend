import './Promo.css';
import '../Main.css';

function Promo(props) {

    const handleFocus = (e) => {
        switch (e.target.id) {
            case 'projectRef':
                props.focusOnRef(props.projectRef);
                break;
            case 'techsRef':
                props.focusOnRef(props.techsRef);
                break;
            case 'aboutMeRef':
                props.focusOnRef(props.aboutMeRef);
                break;
            default:
                props.focusOnRef(props.projectRef);
        }
    };

    return (
        <>
            <h1 className='main__title promo-main__title_margin'>Учебный проект студента факультета Веб-разработки.</h1>
            <ul className='promo__buttons-area'>
                <li
                    id='projectRef'
                    className='promo__button'
                    type="button"
                    onClick={handleFocus}
                    aria-label="Перейти к описанию проекта"
                >О проекте</li>
                <li
                    id='techsRef'
                    className='promo__button'
                    type="button"
                    onClick={handleFocus}
                    aria-label="Перейти к описанию использованых технологий"
                >Технологии</li>
                <li
                    id='aboutMeRef'
                    className='promo__button'
                    type="button"
                    onClick={handleFocus}
                    aria-label="Перейти к профилю студента"
                >Студент</li>
            </ul>
        </>
    );
}
export default Promo;