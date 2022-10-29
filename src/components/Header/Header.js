import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Header.css'

function Header(props) {
    const [headerLinks, setHeaderLinks] = useState('');
    const [userBox, setUserBox] = useState('');
    const { pathname } = useLocation();
    useEffect(() => {
        switch (pathname) {
            case '/signin':
                setHeaderLinks(<div className="header__no-links"></div>)
                setUserBox(<div className="header__no-form"></div>);
                break;
            case '/signup':
                setHeaderLinks(<div className="header__no-links"></div>)
                setUserBox(<div className="header__no-form"></div>);
                break;
            case '/movies':
            case '/saved-movies':
            case '/profile':
                setHeaderLinks(<div className="header__links-form">
                    <Link to='/movies' className="header__link">Фильмы</Link>
                    <Link to='/saved-movies' className="header__link">Сохранённые фильмы</Link>
                </div>)
                setUserBox(<div className="header__user-form">
                    <Link to='/profile' className="header__link">Аккаунт</Link>
                    <Link to='/profile' className="header__img-link" />
                </div>);
                break;

            default:
                setHeaderLinks(<div className="header__no-links"></div>)
                setUserBox(<div className="header__user-buttons">
                    <p className="header__signup">Регистрация</p>
                    <div className="header__button">Войти</div>
                </div>);
        }
    }, [pathname]);

    return (
        <header className="header">
            <Link to='/' className="header__logo"></Link>
            {headerLinks}
            {userBox}
        </header>
    );
}

export default Header;