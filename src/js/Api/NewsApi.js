export default class MainApi {
  constructor(){

  }

  getNews(word) {
    return fetch(`http://newsapi.org/v2/everything?q=${word}&from=2020-05-06&to=2020-05-11&apiKey=11f0b883a812400d934eac006a37e236`, {
      method: 'GET',
    })
    .then((res)=> {
      if(res.ok){
        return res.json();
      }
    })
    .catch((err)=> {
      console.log('Ошибка' + err)
    })
  }
}