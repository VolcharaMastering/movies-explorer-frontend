/* eslint-disable react-hooks/exhaustive-deps */
import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


function Profile({ updateProfile, updateUser, onLogout }) {
    const user = React.useContext(CurrentUserContext);

    const [errMessage, setErrMessage] = React.useState('');
    const expression=/[a-zA-Zа-яА-Я0-9- ]+?$/;

    let validForm = yup.object().shape({
        email: yup.string()
            .required("Поле E-mail не может быть пустым")
            .email("Введите корректный E-mail"),
        name: yup.string()
            .required("Поле Имя не может быть пустым")
            .matches(expression, "Имя содержит только латиницу, кириллицу, пробел или дефис"),
    });

    const onSubmit = (userData) => {
        console.log(userData)
        updateProfile(userData)
            .then(() => {
                updateUser(userData);
                console.log (userData);
            })
            .catch((err) => {
                setErrMessage('Что-то пошло не так! Попробуйте ещё раз.');
                console.log(errMessage)
            })

    }
    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        mode: "all",
        resolver: yupResolver(validForm)
    });
    return (
        <form className='profile__form'
        onSubmit={handleSubmit(onSubmit)}
        >
            <div className='profile__box'>
                <h2 className='profile__greeting'>Привет, {user.name}!</h2>
                <div className='profile__name'>
                    <p className='profile__label'>Имя</p>
                    {/* <p className='profile__auto-label'>{user.name}</p> */}
                    <input
                        {...register("name")}
                        className="profile__auto-label"
                        id="profile-name"
                        defaultValue={user.name}
                    />
                    <span className={
                        `profile__valid-error 
                        ${errors.name ? 'profile__valid-error_active' : ''}`
                    }>
                        {errors?.name && errors?.name?.message}
                    </span>
                </div>
                <div className='profile__name'>
                    <p className='profile__label'>E-mail</p>
                    {/* <p className='profile__auto-label'>{userMail}</p> */}
                    <input
                        {...register("email")}
                        className="profile__auto-label"
                        type="text"
                        id="profile-email"
                        defaultValue={user.email || ''}
                    />
                    <span className={
                        `profile__valid-error 
                        ${errors.email ? 'profile__valid-error_active' : ''}`
                    }>
                        {errors?.email && errors?.email?.message}
                    </span>
                <span className="profile__compare-message">
                    {errMessage}
                </span>
                </div>
                <button
                    className={`profile__change ${!isValid && 'profile__change_disabled'}`}
                    disabled={!isValid}
                    type="submit"
                    aria-label='change user info'
                >
                    Редактировать
                </button>
                <p
                    className="profile__exit"
                    type="button"
                    aria-label='exit user'
                onClick={onLogout}
                >
                    Выйти из аккаунта
                </p>
            </div>
        </form>
    );

};

export default Profile;