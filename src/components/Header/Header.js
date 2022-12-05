import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Header.css'
import './header__burger.css'

function Header(props) {
    const [headerLinks, setHeaderLinks] = useState('');
    const [userBox, setUserBox] = useState('');
    const [linkActive, setLinkActive] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeMenu();
            }
        }
        if (isMenuOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isMenuOpen]);

    useEffect(() => {
        function toggleMenu() {
            setIsMenuOpen(!isMenuOpen);
        };

        const getHTML = () => {
            if (props.changedWidth === 'monitor') {
                setHeaderLinks(
                    <div className="header__links-form">
                        <Link to='/movies' target="_blank" className="header__link">Фильмы</Link>
                        <Link to='/saved-movies' target="_blank" className="header__link">Сохранённые фильмы</Link>
                    </div>)
                setUserBox(
                    <div className="header__user-form">
                        <Link to='/profile' target="_blank" className="header__link">
                            {(linkActive === 'akk') ? '' : 'Аккаунт'}
                        </Link>
                        <Link to='/profile' target="_blank" className="header__img-link" />
                    </div>);
            }
            else {
                setHeaderLinks(<div className="header__no-links"></div>)
                const classBurger = isMenuOpen ? 'header__burger active-burger' : 'header__burger';
                const classMenu = isMenuOpen ? 'header__menu-form header__menu-form_active' : 'header__menu-form';
                setUserBox(
                    <>
                        <div
                            className="header__burger-box"
                            type="button"
                            onClick={toggleMenu}
                            aria-label="Открыть меню сайта"
                        >
                            <div className={classBurger}>
                            </div>
                        </div>

                        <div className={classMenu}>
                            <div className="header__links-form">
                                <Link to='/' target="_blank" 
                                className={`header__link ${(linkActive === 'main') ? 'header__link_active' : ''}`}
                                >
                                    Главная
                                    </Link>
                                <Link
                                    to='/movies'
                                    target="_blank"
                                    className={`header__link ${(linkActive === 'movie') ? 'header__link_active' : ''}`}
                                >
                                    Фильмы
                                </Link>
                                <Link
                                    to='/saved-movies'
                                    target="_blank"
                                    className={`header__link ${(linkActive === 'saved') ? 'header__link_active' : ''}`}
                                >
                                    Сохранённые фильмы
                                </Link>
                            </div>
                            <div className="header__user-form">
                                <Link
                                    to='/profile'
                                    target="_blank"
                                    className={`header__link-akk ${(linkActive === 'akk') ? 'header__link_active' : ''}`}
                                >
                                    Аккаунт
                                </Link>
                                <Link to='/profile' target="_blank" className="header__img-link" />
                            </div>
                        </div>
                        {isMenuOpen ? <div
                            className="header__menu-back"
                            type="button"
                            onClick={closeMenu}
                            aria-label="Закрыть меню сайта по фону"
                        ></div> : ''}
                    </>)
            }
        }

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
                setLinkActive('movie');
                getHTML();
                console.log("regstate", props.loggedIn)
                break;
            case '/saved-movies':
                setLinkActive('saved');
                getHTML();
                break;
            case '/profile':
                setLinkActive('akk');
                getHTML();
                console.log("regstate", props.loggedIn)
                break;
            default:
                if (props.loggedIn) {
                    setLinkActive('main');
                    getHTML();
                } else {
                    console.log("regstate", props.loggedIn)
                    setHeaderLinks(<div className="header__no-links"></div>)
                    setUserBox(<div className="header__user-buttons">
                        <Link to="/signup" target="_blank" className="header__signup">Регистрация</Link>
                        <Link to="/signin" target="_blank" className="header__button">Войти</Link>
                    </div>);
                }
        }

    }, [pathname, props.changedWidth, isMenuOpen, linkActive, props.loggedIn]);

    useEffect(() => {
        if (props.changedWidth === 'monitor') { setIsMenuOpen(false) };
    }, [props.changedWidth])

    return (
        <header className={
            `header 
        ${(pathname === '/signin' || pathname === '/signup') ?
                'header_replace' : ''}
    `}>

            <div className={
                `header__logo-box 
            ${(pathname === '/signin' || pathname === '/signup') ?
                    'header__logo-box_replace' : ''}
        `}
            >
                <Link to='/' target="_blank" className="header__logo"></Link>
            </div>
            {headerLinks}
            {userBox}
        </header>
    );
}

export default Header;