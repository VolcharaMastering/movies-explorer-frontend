import { URL_CONFIG } from "./constants.js";

class Api {
  constructor(token) {
    this._URL_CONFIG = URL_CONFIG;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log("OK!");
      return res.json();
    }
    return Promise.reject(`Bug detected! ${res.status}: ${res.statusText}`);
  }

  setMovie(settings) {
    return fetch(this._URL_CONFIG.url + "movies", {
      headers: this._URL_CONFIG.headers,
      method: "POST",
      body: JSON.stringify(settings),
    }).then(this._checkResponse);
  }
  getMovies() {
    return fetch(this._URL_CONFIG.url + "movies", {
      headers: this._URL_CONFIG.headers,
      method: "GET",
    }).then(this._checkResponse);
  }

  delMovie(movieId) {
    return fetch(this._URL_CONFIG.url + "movies/" + movieId, {
      headers: this._URL_CONFIG.headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }
  register(data) {
    return fetch(this._URL_CONFIG.url + "signup", {
      headers: this._URL_CONFIG.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  authorize(data) {
    return fetch(this._URL_CONFIG.url + "signin", {
      headers: this._URL_CONFIG.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  authByToken(token) {
    return fetch(this._URL_CONFIG.url + "users/me", {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getData() {
    return fetch(this._URL_CONFIG.url + "users/me", {
      headers: this._URL_CONFIG.headers,
    }).then(this._checkResponse);
  }

  setProfile(data) {
    return fetch(this._URL_CONFIG.url + "users/me", {
      headers: this._URL_CONFIG.headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
  logout() {
    return fetch(this._URL_CONFIG.url + "logout", {
      method: "GET",
      credentials: "include",
    }).then(this._checkResponse);
  }
}

const api = new Api();
export default api;
