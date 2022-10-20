import './AboutProject.css';
import '../Main.css';

function AboutProject(props) {
    return (
        <section className='about-project'>
            <div className='about-project__title-box'>
                <h2 className='main__subtitle'>О проекте</h2>
                <div className='about-project__describe'>
                    <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
                    <h3 className='about-project__title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text'>
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
                    <div className='about-project__cell'><p>Back-end</p></div>
                    <div className='about-project__cell'><p>Front-end</p></div>
                </div>
            </div>
        </section>
    );

};

export default AboutProject;