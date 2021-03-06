export default class MainApi {
  constructor(formatDate){
    this._formatDate = formatDate;
  }

  getNews(word) {
    return fetch(`https://newsapi.org/v2/everything?q=${word}&` +
    `from=${this._formatDate(new Date(((Math.floor(Date.now() / 1000)) - 604800)*1000))}&` +
    `to=${this._formatDate(new Date())}&apiKey=11f0b883a812400d934eac006a37e236&pageSize=100`,
    {
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