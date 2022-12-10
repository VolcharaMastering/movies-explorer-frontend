import './Login.css';
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

function Login({ onLogin, message, setBlockForm, blockForm, setMessage }) {
    React.useEffect(() => {
        setMessage('');
    }, [])
    let validForm = yup.object().shape({
        email: yup.string()
            .required("Поле E-mail не может быть пустым")
            .email("Введите корректный E-mail"),
        password: yup.string()
            .required("Поле Пароль не может быть пустым")
            .min(6, "Пароль не может быть короче 6 символов")
            .max(20, "Пароль не может быть длиннее 20 символов"),
    });

    const onSubmit = (loginData) => {
        if (!loginData.email || !loginData.password) {
            return setMessage('Email или пароль не верные!');
        }
        setBlockForm(true);
        onLogin(loginData);
    }

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validForm)
    });

    return (
        <section className="login">
            <form
                className="login__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="login__greeting">Рады видеть!</h2>
                <div className="login__input-box">
                    <p className="login__input-label">E-mail</p>
                    <input
                        {...register("email")}
                        className="login__input"
                        disabled={blockForm}
                        id="login-email"
                        placeholder="Email"
                    />
                    <span className={
                        `login__valid-error 
                        ${errors.email ? 'login__valid-error_active' : ''}`
                    }>
                        {errors?.email && errors?.email?.message}
                    </span>
                </div>
                <div className="login__input-box">
                    <p className="login__input-label">Пароль</p>
                    <input
                        {...register("password")}
                        type="password"
                        className="login__input"
                        disabled={blockForm}
                        id="login-password"
                        placeholder="Пароль"
                    />
                    <span className={
                        `login__valid-error 
                        ${errors.password ? 'login__valid-error_active' : ''}`
                    }>
                        {errors?.password && errors?.password?.message}
                    </span>

                    <span className="login__compare-message">
                        {message}
                    </span>
                </div>

                <button
                    className={`login__button ${(!isValid || blockForm) && 'login__button_disabled'}`}
                    disabled={!isValid || blockForm}
                    type="submit"
                    aria-label="Кнопка авторизации">
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