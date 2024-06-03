
export const formatData = (timestamp,type) => {
  if(type===null)
    type=0;
  
  const nomeMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const date = new Date(timestamp);
  if(type==2){
      const dia = date.getDate();
      const mes = date.getMonth();
      const ano = date.getFullYear();
      const formated = dia+" de "+nomeMes[mes]+", "+ano;
     return `${formated}`;
  }

  const now = new Date();
  const diff = now - date; 

  const minutos = parseInt(diff/60000);
  const horas = parseInt(minutos / 60);
  const dias = parseInt(horas/24);

  let formated;
  if(minutos<1){
    formated = 'Há Menos de um minuto';
  }
  else if(horas<1){
    formated = `Há ${minutos} minutos`
  }
  else if(dias<1){
    formated = `Há ${horas} horas`
  }
  else if(dias>=1){
    formated = `Há ${dias} dia`
  }
  else{
    formated = `Há ${dias} dias`  
  }

  return `${formated}`;

}

export const timeToRead = (textField) =>{
 const wordsPerMinute = 200; // Número médio de palavras por minuto
  const words = textField.split(/\s+/).length; // Conta o número de palavras no texto
  const minutesToRead = words / wordsPerMinute;

  if (minutesToRead < 1) {
    const secondsToRead = Math.ceil(minutesToRead * 60);
    return `Um minuto`;
  } else if (minutesToRead < 60) {
    return `${Math.ceil(minutesToRead)} minutos`;
  } else {
    const hoursToRead = Math.floor(minutesToRead / 60);
    const remainingMinutes = Math.ceil(minutesToRead % 60);
    if (remainingMinutes === 0) {
      return `${hoursToRead} horas`;
    } else {
      return `${hoursToRead} horas e ${remainingMinutes} minutos`;
    }
  }
}

export const nameNormalize = (textField) =>{
  textField = textField.toLowerCase();
  const words = textField.split(" ");
  
  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });
  return capitalizedWords.join(" ");
}

export const changeDomainURL = (textField,newDomain)=>{
const newText = textField.replace(/(!\[.*?\]\()(?:https?:\/\/)?[^\/]+\//g, `$1${newDomain}`);

  return newText;

}