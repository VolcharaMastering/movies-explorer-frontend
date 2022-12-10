import "./Profile.css";
import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Profile({
  updateProfile,
  message,
  setMessage,
  setBlockForm,
  blockForm,
  onLogout,
}) {
  const user = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setMessage("");
  }, []);
  const userName = user.name;
  const userEmail = user.email;
  const expression = /[a-zA-Zа-яА-Я0-9- ]+?$/;
  let validForm = yup.object().shape({
    email: yup
      .string()
      .required("Поле E-mail не может быть пустым")
      .email("Введите корректный E-mail"),
    name: yup
      .string()
      .required("Поле Имя не может быть пустым")
      .matches(
        expression,
        "Имя содержит только латиницу, кириллицу, пробел или дефис"
      ),
  });
  const onSubmit = (userData) => {
    setBlockForm(true);
    updateProfile(userData);
  };
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validForm),
  });
  return (
    <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="profile__box">
        <h2 className="profile__greeting">Привет, {userName}!</h2>
        <div className="profile__name">
          <p className="profile__label">Имя</p>
          <input
            {...register("name")}
            className="profile__auto-label"
            disabled={blockForm}
            id="profile-name"
            defaultValue={userName}
          />
          <span
            className={`profile__valid-error 
                        ${errors.name ? "profile__valid-error_active" : ""}`}
          >
            {errors?.name && errors?.name?.message}
          </span>
        </div>
        <div className="profile__name">
          <p className="profile__label">E-mail</p>
          <input
            {...register("email")}
            className="profile__auto-label"
            disabled={blockForm}
            type="text"
            id="profile-email"
            defaultValue={userEmail}
          />
          <span
            className={`profile__valid-error 
                        ${errors.email ? "profile__valid-error_active" : ""}`}
          >
            {errors?.email && errors?.email?.message}
          </span>
          <span className="profile__compare-message">{message}</span>
        </div>
        <button
          className={`profile__change ${
            (!isValid || blockForm) && "profile__change_disabled"
          }`}
          disabled={!isValid || blockForm}
          type="submit"
          aria-label="change user info"
        >
          Редактировать
        </button>
        <p
          className="profile__exit"
          type="button"
          aria-label="exit user"
          onClick={onLogout}
        >
          Выйти из аккаунта
        </p>
      </div>
    </form>
  );
}

export default Profile;
