/* eslint-disable react-hooks/exhaustive-deps */
import "../../index.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../utils/MainApi.js";
import ProtectedRoute from "../ProtectedRoute.js";

function App() {
  const [changedWidth, setChangedWidth] = useState("");
  const [addMovies, setAddMovies] = useState(Number);
  const [moviesPerPage, setMoviesPerPage] = useState(Number);
  const [notFoundPage, setNotFoundPage] = useState(false);
  const [loginFlag, setLoginFlag] = useState(false);
  const [message, setMessage] = React.useState("");
  const [blockForm, setBlockForm] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  //----------user state------------
  const [currentUser, setCurrentUser] = React.useState({});

  //---------user state-------------
  const [loggedIn, setLoggedIn] = React.useState(false);

  //----here is checking window resizing------
  //-----making constants depending on window width--------
  const checkWindowSize = () => {
    switch (true) {
      case window.innerWidth <= 649:
        setChangedWidth("mobile");
        setAddMovies(2);
        setMoviesPerPage(5);
        break;
      case window.innerWidth <= 959:
        setChangedWidth("tablet");
        setAddMovies(2);
        setMoviesPerPage(8);
        break;
      default:
        setChangedWidth("monitor");
        setAddMovies(3);
        setMoviesPerPage(12);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  });
  useEffect(() => {}, [changedWidth]);
  useEffect(() => {
    checkWindowSize();
  }, []);

  const makeMark = (val) => {
    setNotFoundPage(val);
  };
  //--------Auth functionality-------------
  function onLogin(data) {
    return mainApi
      .authorize(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setMessage("Вы успешно авторизировались!");
      })
      .catch((err) => {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setBlockForm(false);
      });
  }

  function onRegister(data) {
    return mainApi
      .register(data)
      .then(() => {
        setMessage("Регистрация прошла успешно!");
        onLogin({ email: data.email, password: data.password });
      })
      .catch((err) => {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setBlockForm(false);
      });
  }
  function updateProfile(userData) {
    mainApi
      .setProfile(userData)
      .then((newUser) => {
        updateCurrentUser(newUser);
        setMessage("Изменения в профиль успешно внесены");
      })
      .catch((err) => {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setBlockForm(false);
      });
  }

  function onLogout() {
    setLoggedIn(false);
    setLoginFlag(false);
    updateCurrentUser({});
    setMessage("");
    localStorage.clear();
    history.push("/");
  }
  const updateCurrentUser = (data) => {
    setCurrentUser(data);
  };
  const logging = () => {
    mainApi
      .getData()
      .then((usersInfo) => {
        updateCurrentUser(usersInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //-----------Check token-------------
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    mainApi
      .authByToken(jwt)
      .then((res) => {
        setLoggedIn(true);
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
      setLoginFlag(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (
      (loggedIn && pathname === "/signin") ||
      (loggedIn && pathname === "/signup")
    ) {
      history.push("/movies");
      history.go(0);
    }
  }, [pathname, history, loginFlag]);
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div
          className={`app 
                        ${
                          pathname === "/signin" || pathname === "/signup"
                            ? "app_replace"
                            : ""
                        }`}
        >
          {notFoundPage ? null : (
            <Header changedWidth={changedWidth} loggedIn={loggedIn} />
          )}

          <Switch>
            <Route path="/signin">
              <Login
                onLogin={onLogin}
                message={message}
                blockForm={blockForm}
                setBlockForm={setBlockForm}
                setMessage={setMessage}
              />
            </Route>
            <Route path="/signup">
              <Register
                onRegister={onRegister}
                message={message}
                setMessage={setMessage}
                blockForm={blockForm}
                setBlockForm={setBlockForm}
              />
            </Route>
            <Route exact path="/">
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute
              exec
              path="/movies"
              loggedIn={loggedIn}
              tokenCheck={tokenCheck}
              changedWidth={changedWidth}
              moviesPerPage={moviesPerPage}
              checkWindowSize={checkWindowSize}
              setMoviesPerPage={setMoviesPerPage}
              addMovies={addMovies}
              component={Movies}
            />
            <ProtectedRoute
              exec
              path="/saved-movies"
              loggedIn={loggedIn}
              changedWidth={changedWidth}
              moviesPerPage={moviesPerPage}
              setMoviesPerPage={setMoviesPerPage}
              addMovies={addMovies}
              component={SavedMovies}
            />
            <ProtectedRoute
              exec
              path="/profile"
              loggedIn={loggedIn}
              updateProfile={updateProfile}
              message={message}
              setMessage={setMessage}
              blockForm={blockForm}
              setBlockForm={setBlockForm}
              onLogout={onLogout}
              component={Profile}
            />
            <Route path="/*">
              <NotFound makeMark={makeMark} />
            </Route>
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
