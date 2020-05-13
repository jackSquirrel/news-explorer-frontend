export default class MainApi {
  constructor(props){
    this._link = props.baseUrl;
  }

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
      return err.json();
    })
  }

}