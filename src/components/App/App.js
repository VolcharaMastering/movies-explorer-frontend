import '../../index.css';
import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js"
import Movies from '../Movies/Movies';


function App() {
    const [changedWidth, setChangedWidth] = useState('');
    const [addMovies, setAddMovies] = useState(Number);
    const [moviesPerPage, setMoviesPerPage] = useState(Number);

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

    return (
        <div className='page'>
            <div className='app'>
                <Header
                    changedWidth={changedWidth}
                />
                <Switch>
                    {/* <Route path='/signin'>

                </Route>
                <Route path='/signup'>

                </Route> */}
                    <Route exact path='/'>
                        <Main />
                    </Route>
                    <Route path='/movies'>
                        <Movies
                            changedWidth={changedWidth}
                            moviesPerPage={moviesPerPage}
                            setMoviesPerPage={setMoviesPerPage}
                            addMovies={addMovies}
                        />
                    </Route>
                    {/*    <Route path='/saved-movies'>

                </Route>
                <Route path='/profile'>

                </Route> */}

                </Switch>
                <Footer />
            </div>
        </div>
    );
}

export default App;