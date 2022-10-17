// import './App.css';
import React from "react";
// import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';


function App() {
    return (
        <div>
            <Switch>
                <Route path='/signin'>

                </Route>
                <Route path='/signup'>

                </Route>
                <Route exact path='/'>

                </Route>
                <Route path='/movies'>

                </Route>
                <Route path='/saved-movies'>

                </Route>
                <Route path='/profile'>

                </Route>

            </Switch>
        </div>
    );
}

export default App;