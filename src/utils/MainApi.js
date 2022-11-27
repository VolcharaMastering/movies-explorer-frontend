import { URL_CONFIG } from './constants.js';

class Api {
    constructor(token) {
        this._URL_CONFIG = URL_CONFIG;
        this._token = token;
    }

}

const api = new Api();
export default api;