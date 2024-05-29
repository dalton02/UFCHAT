
export const formatData = (timestamp) => {
 
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date; 
  console.log(diff);

  const minutos = parseInt(diff/60000);
  const horas = parseInt(minutos / 60);
  const dias = parseInt(horas/60);

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
  else{
    formated = `Há ${dias} dias`
  }

  return `${formated}`;

}