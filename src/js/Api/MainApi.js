export default class MainApi {
  constructor(props){
    this._link = props.baseUrl;
  }

  // Запрос на создание нового пользователя
  signup(email, name, password) {
    return fetch(`${this._link}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password
      })
    })
    .then((res)=> {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .catch((err)=> {
      console.log('Ошибка: ' + err.message);
      return err.json();
    })
  }

  // Запрос на авторизацию
  signin(email, password) {
    return fetch(`${this._link}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((res)=> {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .catch((err)=> {
      console.log('Ошибка: ' + err.message);
      return err.json();
    })
  }

  // Запрос на получение данных пользователя
  getUserData(){
    return fetch(`${this._link}/users/me`, {
      method: 'GET',
      credentials: 'include'
    })
    .then((res)=> {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(res);
    })
    .catch((err)=> {
      console.log('Ошибка: ' + err.statusCode);
    })
  }

  // Запрос на добавление карточки в сохраенные
  saveArticle(keyword, title, text, date, source, link, image){
    return fetch(`${this._link}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image
      })
    })
    .then((res)=> {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(res);
    })
    .catch((err)=> {
      console.log('Ошибка' + err.statusCode);
    })
  }

  // Запрос на удаление карточек из сохраненных
  deleteArticle(cardId){
    return fetch(`${this._link}/articles/${cardId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then((res)=> {
      if(res.ok){
        return res.json()
      }
      return Promise.reject(res)
    })
    .catch((err)=> {
      console.log('Ошибка' + err.statusCode);
    })
  }

  // Запрос на получение всех сохраненных карточек
  getArticles(){
    return fetch(`${this._link}/articles`, {
      method: 'GET',
      credentials: 'include'
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }
      return Promise.reject(res);
    })
    .catch((err)=>{
      console.log('Ошибка' + err.statusCode);
    })
  }
}