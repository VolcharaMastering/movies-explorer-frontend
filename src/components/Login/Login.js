import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Login.css';

function Login(props) {
    // const [loginData, setLoginData] = useState({
    //     email: '',
    //     password: '',
    // });

    // const handleChange = (evt) => {
    //     const { name, value } = evt.target;
    //     setLoginData({
    //         ...loginData,
    //         [name]: value,
    //     });
    // };

    return (
        <section className="login">
            <form
                className="login__form"
            // onSubmit={handleSubmit}
            >
                <h2 className="login__greeting">Рады видеть!</h2>
                <div className="login__input-box">
                    <p className="login__input-label">E-mail</p>
                    <input
                        type="text"
                        className="login__input"
                        id="login-email"
                        name="e-mail"
                        // value={loginData.email}
                        // onChange={handleChange}
                        required
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                    />
                </div>
                <div className="login__input-box">
                    <p className="login__input-label">Пароль</p>
                    <input
                        type="password"
                        className="login__input"
                        id="login-password"
                        name="password"
                        // value={loginData.password}
                        // onChange={handleChange}
                        required
                        placeholder="Пароль"
                        minLength="6"
                        maxLength="20"
                    />
                </div>
                <button
                    className="login__button"
                    type="submit"
                    aria-label="Кнопка регистрации">
                    <p className="login__button_label">Войти</p>
                </button>
                <div className="login__label">
                    <p>Ещё не зарегистрированы?&nbsp;</p>
                    <Link to="/signup" className="login__login-link">Регистрация</Link>
                </div>
            </form>
        </section>
    )
}

export default Login;