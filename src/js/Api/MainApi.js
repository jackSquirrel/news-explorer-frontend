export default class MainApi {
  constructor(props){
    this._link = props.baseUrl;
  }

  signup(email, name, password) {
    return fetch(`${this._link}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password
      })
    })
    .then((res)=> {
      if(res.ok){
        console.log('ok');
        return res.json();
      }
    })
    .catch((err)=> {
      console.log(`Ошибка: ${err}`);
    })
  }
}