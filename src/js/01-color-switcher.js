// Отримуємо доступ до елементів
const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};

// Ідентифікатор
let timerId = null;

// Первинне значення button "STOP"
refs.stop.disabled = true;

// Ф-я зміни кольору через інтервал та зміна значення "disabled"
function startColor() {
  changeBodyColor();
  timerId = setInterval(() => {
    changeBodyColor();
  }, 1000);
  refs.stop.disabled = false;
  refs.start.disabled = true;
}

// Ф-я зупинки виконання зміни кольору та зміна значення "disabled"
function stopColor() {
  clearInterval(timerId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
}

// Ф-я генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Ф-я встановлення кольору на <Body>
function changeBodyColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

// Вішання сдухачів
refs.start.addEventListener('click', startColor);
refs.stop.addEventListener('click', stopColor);
