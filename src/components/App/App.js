import '../../index.css';
import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js"
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
    const [changedWidth, setChangedWidth] = useState('');
    const [addMovies, setAddMovies] = useState(Number);
    const [moviesPerPage, setMoviesPerPage] = useState(Number);
    const [notFoundPage, setNotFoundPage] = useState(false);
    const { pathname } = useLocation();

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

    return (
        <div className='page'>
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
                        <Login />
                    </Route>
                    <Route path='/signup'>
                        <Register />
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
        </div>
    );
}

export default App;