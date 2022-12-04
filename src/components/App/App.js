import '../../index.css';
import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js"
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import mainApi from "../../utils/MainApi.js";

function App() {
    const [changedWidth, setChangedWidth] = useState('');
    const [addMovies, setAddMovies] = useState(Number);
    const [moviesPerPage, setMoviesPerPage] = useState(Number);
    const [notFoundPage, setNotFoundPage] = useState(false);
    const { pathname } = useLocation();

    //----------user state------------
    const [currentUser, setCurrentUser] = React.useState({});
    const [regState, setRegState] = useState(false);

    //---------user data for profile and login-------------
    // const [userEmail, setUserEmail] = React.useState('');
    // const [userName, setUserName] = React.useState('');
     //---------user state-------------
    const [loggedIn, setLoggedIn] = React.useState(false);

    const history = useHistory();

    //----here is checking window resizing------
    const checkWindowSize = () => {
        //-----making constants depending on window width-------- 
        switch (true) {
            case (window.innerWidth <= 649):
                setChangedWidth('mobile');
                setAddMovies(3)
                setMoviesPerPage(5);
                break;
            case (window.innerWidth <= 959):
                setChangedWidth('tablet');
                setAddMovies(4);
                setMoviesPerPage(8);
                break;
            default:
                setChangedWidth('monitor');
                setAddMovies(6);
                setMoviesPerPage(12);
        }
    };


    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);
    });
    useEffect(() => { }, [changedWidth]);
    useEffect(() => {
        checkWindowSize();
    }, []);
    const makeMark = (val) => {
        setNotFoundPage(val);
    };

    //-----------Check token-------------

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) { return };

        mainApi.authByToken(jwt)
            .then((res) => {
                // setUserEmail(res.email);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        tokenCheck();
    }, [loggedIn]);
    //------------------------------------------------------------------

    //--------Auth functionality-------------
    function onLogin(data) {
        return mainApi.authorize(data)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                // setUserEmail(data.email);
                setLoggedIn(true);
                history.go('/movies');
            });
    }

    function onRegister(data) {
        return mainApi.register(data)
            .then(() => {
                history.push('/signin');
            })
    }

    function onLogout(e) {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/signin');
    }

    
    const logging = () => {
        mainApi.getData()
            .then((usersInfo) => {
                setCurrentUser(usersInfo);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        if (loggedIn) {
            logging();
            // history.push('/movies');
        }
    }, [loggedIn, history]);

    return (
        <div className='page'>
        <CurrentUserContext.Provider value={currentUser}>
            <div className={
                `app 
                     ${(pathname === '/signin' || pathname === '/signup') ?
                    'app_replace' : ''}
            `}>
                {
                    notFoundPage ? null : <Header
                        changedWidth={changedWidth}
                    />
                }
                <Switch>
                    <Route path='/signin'>
                    <Login
                            onLogin={onLogin}
                            setRegState={setRegState}
                        />
                    </Route>
                    <Route path='/signup'>
                        <Register 
                            onRegister={onRegister}
                            setRegState={setRegState}
                        />
                    </Route>
                    <Route exact path='/'>
                        <Main />
                        <Footer />
                    </Route>
                    <Route path='/movies'>
                        <Movies
                            changedWidth={changedWidth}
                            moviesPerPage={moviesPerPage}
                            setMoviesPerPage={setMoviesPerPage}
                            addMovies={addMovies}
                        />
                        <Footer />
                    </Route>
                    <Route path='/saved-movies'>
                        <SavedMovies
                            changedWidth={changedWidth}
                            moviesPerPage={moviesPerPage}
                            setMoviesPerPage={setMoviesPerPage}
                            addMovies={addMovies}
                        />
                        <Footer />
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>

                    <Route path='/*'>
                        <NotFound
                            makeMark={makeMark}

                        />
                    </Route>
                </Switch>
            </div>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;