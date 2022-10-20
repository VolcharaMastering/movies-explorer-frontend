import './Header.css'
function Header(props) {

    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__user-form">
                <p className="header__signup">Регистрация</p>
                <div className="header__button">Войти</div>
            </div>
        </header>
    );
}

export default Header;