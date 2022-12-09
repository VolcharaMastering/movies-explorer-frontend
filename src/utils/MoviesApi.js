import { MOVIE_URL } from './constants.js';

class MovieApi {
    constructor(token) {
        this._MOVIE_URL = MOVIE_URL;
        this._token = token;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Bug detected! ${res.status}: ${res.statusText}`);
    }

    getMovies() {
        return fetch(this._MOVIE_URL, {
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(this._checkResponse);
    }
}

const moviesApi = new MovieApi();
export default moviesApi;