import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


function Register({ onRegister, setRegState }) {
    //---------Error answer in registration-------------
    const [errMessage, setErrMessage] = useState('');
    const expression=/[a-zA-Zа-яА-Я0-9- ]+?$/;
    let validForm = yup.object().shape({
        email: yup.string()
            .required("Поле E-mail не может быть пустым")
            .email("Введите корректный E-mail"),
        password: yup.string()
            .required("Поле Пароль не может быть пустым")
            .min(6, "Пароль не может быть короче 6 символов")
            .max(20, "Пароль не может быть длиннее 20 символов"),
        name: yup.string()
            .required("Поле Имя не может быть пустым")
            .matches(expression, "Имя содержит только латиницу, кириллицу, пробел или дефис"),
    });

    const onSubmit = (registerData) => {
        onRegister(registerData)
            .then(() => {
                // onLogin({ registerData.email, registerData.password })
                //     .then(() => {
                //         setRegState(true);
                //     })
                //     .catch((err) => {
                //         setErrMessage('Что-то пошло не так! Попробуйте ещё раз.');
                //         setRegState(false);
                //     })
                console.log (registerData);
                // setRegState(true);
            })
            .catch((err) => {
                setErrMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setRegState(false);
            })

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
        <section className="register">
            <form
                className="register__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="register__greeting">Добро пожаловать!</h2>
                <div className="register__input-box">
                    <p className="register__input-label">Имя</p>
                    <input
                        {...register("name")}
                        className="register__input"
                        id="register-name"
                        placeholder="Имя"
                    />
                    <span className={
                        `register__valid-error 
                        ${errors.name ? 'register__valid-error_active' : ''}`
                    }>
                        {errors?.name && errors?.name?.message}
                    </span>
                </div>
                <div className="register__input-box">
                    <p className="register__input-label">E-mail</p>
                    <input
                        {...register("email")}
                        className="register__input"
                        id="register-email"
                        placeholder="Email"
                    />
                    <span className={
                        `register__valid-error 
                        ${errors.email ? 'register__valid-error_active' : ''}`
                    }>
                        {errors?.email && errors?.email?.message}
                    </span>
                </div>
                <div className="register__input-box">
                    <p className="register__input-label">Пароль</p>
                    <input
                        {...register("password")}
                        type="password"
                        className="register__input"
                        id="register-password"
                        placeholder="Пароль"
                    />
                    <span className={
                        `register__valid-error 
                        ${errors.password ? 'register__valid-error_active' : ''}`
                    }>
                        {errors?.password && errors?.password?.message}
                    </span>
                </div>
                <span className="register__compare-message">
                    {errMessage}
                </span>
                <button
                    className={`register__button ${!isValid && 'register__button_disabled'}`}
                    disabled={!isValid}
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