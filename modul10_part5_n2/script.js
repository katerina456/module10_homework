let button = document.querySelector('.button');

button.addEventListener('click', () => {
  alert(`Ширина экрана устройства: ${window.screen.width}, Высота экрана устройства: ${window.screen.height} `);
})