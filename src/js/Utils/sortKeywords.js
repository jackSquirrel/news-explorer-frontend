export default function sortKeywords(keywords) {
  let keywordList = [];
  for(let i = 0; i < keywords.length; i++){
    if(!keywordList.find((keyword)=>{
      if(keywords[i] === keyword.name){
        keyword.num++;
        return true;
      }
      return false
    })){
      keywordList.push({name: keywords[i], num: 1})
    }
  }
  keywordList.sort((a, b) => a.num < b.num ? 1 : -1);
  return keywordList;
}