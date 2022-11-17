/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Profile.css';


function Profile(props) {

    const handleSubmitForm = (e) => {
        e.preventDefault();
        props.handleChangeInfo(e);
    }
    const userName='Юзверь';
    const userMail='uzver@milo.com';
    return (
            <form className='profile__form'>
                <div className='profile__box'>
                    <h2 className='profile__greeting'>Привет, !</h2>
                    <div className='profile__name'>
                        <p className='profile__label'>Имя</p>
                        <p className='profile__auto-label'>Юзверь</p>
                    </div>
                    <div className='profile__name'>
                        <p className='profile__label'>E-mail</p>
                        <p className='profile__auto-label'></p>
                    </div>
                    <button
                        className="profile__change"
                        type="button"
                        aria-label='change user info'
                        onClick={handleSubmitForm}
                    >
                        Редактировать
                    </button>
                    <button
                        className="profile__exit"
                        type="button"
                        aria-label='exit user'
                        // onClick={onLogout}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </form>
    );

};

export default Profile;