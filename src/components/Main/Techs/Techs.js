import './Techs.css';
import '../Main.css';

function Techs(props) {
    return (
        <section className='techs'>
            <div className='techs__title-box'>
                <h2 className='main__subtitle'>Технологии</h2>
                    <h1 className='main__title techs-main__title_margin'>7 технологий</h1>
                    <p className='techs__text'>
                        На курсе веб-разработки мы освоили технологии,
                        которые применили в дипломном проекте.
                    </p>
                    <div className='techs__buttons'>
                        <li className='techs__button'>HTML</li>
                        <li className='techs__button'>CSS</li>
                        <li className='techs__button'>JS</li>
                        <li className='techs__button'>React</li>
                        <li className='techs__button'>Git</li>
                        <li className='techs__button'>Express.js</li>
                        <li className='techs__button'>mongoDB</li>
                    </div>
                </div>
        </section>
    );

};

export default Techs;