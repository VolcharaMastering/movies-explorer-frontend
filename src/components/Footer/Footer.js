import './Footer.css'
function Footer(props) {

    return (
        <footer className="footer">
            <div className='footer__box'>
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__form">
                    <p className="footer__label">© {new Date().getFullYear()}</p>
                    <div className='footer__links-form'>
                        <a href='https://practicum.yandex.ru/' className="footer__link">Яндекс.Практикум</a>
                        <a href='https://github.com/' className="footer__link">Github</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;