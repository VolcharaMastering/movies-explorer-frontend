import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css';

function Register(props) {
    // const [registerData, setRegisterData] = useState({
    //     email: '',
    //     name: '',
    //     password: '',
    // });

    // const handleChange = (evt) => {
    //     const { name, value } = evt.target;
    //     setRegisterData({
    //         ...registerData,
    //         [name]: value,
    //     });
    // };

    return (
        <section className="register">
            <form
                className="register__form"
            // onSubmit={handleSubmit}
            >
                <h2 className="register__greeting">Добро пожаловать!</h2>
                <div className="register__input-box">
                    <p className="register__input-label">Имя</p>
                    <input
                        type="text"
                        className="register__input"
                        id="register-name"
                        name="name"
                        // value={registerData.name}
                        // onChange={handleChange}
                        required
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                    />
                </div>
                <div className="register__input-box">
                    <p className="register__input-label">E-mail</p>
                    <input
                        type="text"
                        className="register__input"
                        id="register-email"
                        name="e-mail"
                        // value={registerData.email}
                        // onChange={handleChange}
                        required
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                    />
                </div>
                <div className="register__input-box">
                    <p className="register__input-label">Пароль</p>
                    <input
                        type="password"
                        className="register__input"
                        id="register-password"
                        name="password"
                        // value={registerData.password}
                        // onChange={handleChange}
                        required
                        placeholder="Пароль"
                        minLength="6"
                        maxLength="20"
                    />
                </div>
                <span className="register__input-error">Что-то пошло не так...</span>
                <button
                    className="register__button"
                    type="submit"
                    aria-label="Кнопка регистрации">
                    <p className="register__button_label">Зарегистрироваться</p>
                </button>
                <div className="register__label">
                    <p>Уже зарегистрированы?&nbsp;</p>
                    <Link to="/signin" className="register__login-link">Войти</Link>
                </div>
            </form>
        </section>
    )
}

export default Register;