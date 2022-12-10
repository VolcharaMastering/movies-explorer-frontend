///------For API request------
const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies/'

const token = localStorage.getItem('jwt');

const URL_CONFIG = {
  'url': 'https://api.movie-diplom-vmstr.nomoredomains.icu/',
  'headers': {
    "Accept": "application/json",
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}
export { URL_CONFIG, MOVIE_URL };