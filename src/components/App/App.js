import '../../index.css';
import './App.css';
import React from "react";
// import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js"


function App() {
    return (
        <div className='page'>
        <div className='app'>
            <Header />
            <Switch>
                {/* <Route path='/signin'>

                </Route>
                <Route path='/signup'>

                </Route> */}
                <Route exact path='/'>
                    <Main/>
                </Route>
            {/*    <Route path='/movies'>

                </Route>
                <Route path='/saved-movies'>

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