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
import ProtectedRoute from '../ProtectedRoute.js';

function App() {
    const [changedWidth, setChangedWidth] = useState('');
    const [addMovies, setAddMovies] = useState(Number);
    const [moviesPerPage, setMoviesPerPage] = useState(Number);
    const [notFoundPage, setNotFoundPage] = useState(false);
    const { pathname } = useLocation();
    const history = useHistory();

    //----------user state------------
    const [currentUser, setCurrentUser] = React.useState({});

    //---------user state-------------
    const [loggedIn, setLoggedIn] = React.useState(false);


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

    

    //--------Auth functionality-------------
    function onLogin(data) {
        return mainApi.authorize(data)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                history.push('/movies')
                
        console.log('from Auth. Go to movie', loggedIn)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onRegister(data) {
        return mainApi.register(data)
            .then(() => {
                onLogin({email: data.email, password: data.password});
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function updateProfile(userData) {
        mainApi.setProfile(userData)
            .then((newUser) => {
                setCurrentUser(newUser);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onLogout() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/');
        console.log('logout', loggedIn)
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
//-----------Check token-------------

const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) { return };

    mainApi.authByToken(jwt)
        .then((res) => {
            setLoggedIn(true);
            console.log('InTokenCheck', loggedIn);
            history.push(pathname);
        })
        .catch((err) => {
            console.log(err);
        });

};
//------------------------------------------------------------------

    useEffect(() => {
        tokenCheck();
        if (loggedIn) {
            logging();
                console.log('checkToken', loggedIn)
        }
    }, [loggedIn]);
    return (
        <div className='page'>
            <CurrentUserContext.Provider value={currentUser}>
                <div className={`app 
                        ${(pathname === '/signin' || pathname === '/signup') ?
                        'app_replace' : ''}`}>

                    {notFoundPage ? null :
                        <Header
                            changedWidth={changedWidth}
                        loggedIn={loggedIn}
                        />}

                    <Switch>
                        <Route path='/signin'>
                            <Login
                                onLogin={onLogin}
                            />
                        </Route>
                        <Route path='/signup'>
                            <Register
                                onRegister={onRegister}
                            />
                        </Route>
                        <Route exact path='/'>
                            <Main />
                            <Footer />
                        </Route>

                        <ProtectedRoute
                            exec path='/movies'
                            loggedIn={loggedIn}
                            tokenCheck={tokenCheck}
                            changedWidth={changedWidth}
                            moviesPerPage={moviesPerPage}
                            setMoviesPerPage={setMoviesPerPage}
                            addMovies={addMovies}
                            component={Movies}
                        />
                        <ProtectedRoute
                            exec path='/saved-movies'
                            loggedIn={loggedIn}
                            changedWidth={changedWidth}
                            moviesPerPage={moviesPerPage}
                            setMoviesPerPage={setMoviesPerPage}
                            addMovies={addMovies}
                            component={SavedMovies}
                        />
                        <ProtectedRoute
                            exec path='/profile'
                            loggedIn={loggedIn}
                            updateProfile={updateProfile}
                            updateUser={setCurrentUser}
                            onLogout={onLogout}
                            component={Profile}
                        />
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