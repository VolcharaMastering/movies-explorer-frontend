///------For API request------
const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies/'
let token = localStorage.getItem('jwt');

const URL_CONFIG = {
  'url': 'https://api.movie-diplom-vmstr.nomoredomains.icu/',
  'headers': {
    "Accept": "application/json",
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

const validName = (value, helpers) => {
  if (!/[a-zA-Zа-яА-Я0-9- ]+?$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export { URL_CONFIG, MOVIE_URL, validName };