import './AboutProject.css';
import '../Main.css';

function AboutProject(props) {
    return (
        <>
            <div className='about-project__title-box'>
                <h2 className='main__subtitle main__subtitle_margin'>О проекте</h2>
                <div className='about-project__describe'>
                    <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
                    <h3 className='about-project__title about-project__title_cell'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text about-project__text_cell'>
                        Составление плана, работу над бэкендом,
                        вёрстку, добавление функциональности
                        и финальные доработки.
                    </p>
                    <p className='about-project__text'>
                        У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать,
                        чтобы успешно защититься.
                    </p>
                </div>
                <div className='about-project__term'>
                    <div className='about-project__cell about-project__cell_light'><p>1 неделя</p></div>
                    <div className='about-project__cell about-project__cell_dark'><p>4 недели</p></div>
                    <div className='about-project__cell'><p className='about-project__cell-text'>Back-end</p></div>
                    <div className='about-project__cell'><p className='about-project__cell-text'>Front-end</p></div>
                </div>
            </div>
        </>
    );

};

export default AboutProject;