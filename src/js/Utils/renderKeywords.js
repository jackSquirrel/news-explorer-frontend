const keywordsContainer = document.querySelector('.keywords');

// Отрисовка ключевых слов
export default function renderKeywords(keywords) {
  if(keywords.length == 1){
    keywordsContainer.textContent = keywords[0].name;
  }
  if(keywords.length == 2){
    keywordsContainer.textContent = keywords[0].name + ' и ' + keywords[1].name;
  }
  if(keywords.length == 3){
    keywordsContainer.textContent = keywords[0].name + ', ' + keywords[1].name + ' и ' + keywords[2].name;
  }
  if(keywords.length > 3){
    keywordsContainer.textContent = keywords[0].name + ', ' + keywords[1].name + ` и ${keywords.length - 2} другим`;
  }
}