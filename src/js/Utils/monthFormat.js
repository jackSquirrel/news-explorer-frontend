// Перевод месяца в русскоязычный формат
export default function monthFormat(month){
  if(month == '01'){
    return ' января, '
  }
  if(month == '02'){
    return ' февраля, '
  }
  if(month == '03'){
    return ' марта, '
  }
  if(month == '04'){
    return ' апреля, '
  }
  if(month == '05'){
    return ' мая, '
  }
  if(month == '06'){
    return ' июня, '
  }
  if(month == '07'){
    return ' июля, '
  }
  if(month == '08'){
    return ' августа, '
  }
  if(month == '09'){
    return ' сентября, '
  }
  if(month == '10'){
    return ' октября, '
  }
  if(month == '11'){
    return ' ноября, '
  }
  if(month == '12'){
    return ' декабря, '
  }
}