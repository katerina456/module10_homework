let text = document.getElementById('text');
let send = document.querySelector('.send');
let geo = document.querySelector('.geo');
let result = document.querySelector('.result');

const url = 'wss://echo-ws-service.herokuapp.com';
const geoUrl = 'https://www.openstreetmap.org/';

send.addEventListener('click', () => {
  writeMessage(text.value);
  websocket.send(text.value);
})    


geo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeMessage('Geolocation не поддерживается вашим браузером');
    flag = !flag;
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  } 
})    


const websocket = new WebSocket(url);


websocket.addEventListener('message', (event) => {
  writeMessage(event.data);
})

let flag = false;

function writeMessage(text) {
  let message = document.createElement('p');
  message.innerHTML = text;
  message.classList.add('message');
  
  if (flag) {
    message.classList.add('message-eho');
  }
  flag = !flag;
  
  result.appendChild(message);
}


const error = () => {
  writeMessage('Невозможно получить ваше местоположение');
  flag = !flag;
}


const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  let href = `<a href='${geoUrl}/#map=18/${latitude}/${longitude}'>Гео-локация</a>`;
  
  writeMessage(href);
  flag = !flag;
}