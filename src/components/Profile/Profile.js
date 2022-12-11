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
  /////-------service consts and effects------------/////
  const user = React.useContext(CurrentUserContext);
  const [disableButton, setDisableButton] = React.useState(true);

  React.useEffect(() => {
    setMessage("");
  }, []);
  /////----------------------------------------------/////

  /////-------------validation consts----------/////
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
  /////----------------------------------------------/////

  /////------------validation with ract-hook-form(useForm)---------------/////
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(validForm),
  });
  /////----------------------------------------------/////

  /////------------function to disable button when no-change------------/////
  useEffect(() => {
    const subscription = watch((value) => {
      if (user.name === value.name && user.email === value.email) {
        setMessage("Необходимо внести изменения");
        setDisableButton(true);
        return;
      } else if (disableButton) {
        setDisableButton(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  /////----------------------------------------------/////

  /////----------reaction on submit---------------/////
  const onSubmit = (userData) => {
    setBlockForm(true);
    updateProfile(userData);
  };

  /////----------------------------------------------/////
  return (
    <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="profile__box">
        <h2 className="profile__greeting">Привет, {user.name}!</h2>
        <div className="profile__name">
          <p className="profile__label">Имя</p>
          <input
            {...register("name")}
            className="profile__auto-label"
            disabled={blockForm}
            id="profile-name"
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
            (!isValid || blockForm || disableButton) &&
            "profile__change_disabled"
          }`}
          disabled={!isValid || blockForm || disableButton}
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
