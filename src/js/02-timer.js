// Підключення Ліби "flatpickr"
import flatpickr from 'flatpickr';
// Імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Підключення Ліби "Notiflix"
import Notiflix from 'notiflix';

// Доступ до елементів
const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// Ідентифікатори
let timerId = 0;
let selectedTime = null;

// Початкове значення кнопки START
refs.start.disabled = true;

// Об'єкт параметрів календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Метод "flatpickr"
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    if (selectedTime < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else if (selectedTime > Date.now()) {
      refs.start.disabled = false;
    }
  },
};

//  Ф-я для підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// Ф-я форматування значення "01, 02, 03"
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Ф-я відтворення інтерфейсу
function updateInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

// Timer + активація кнопки "START"
const startTimer = () => {
  timerId = setInterval(() => {
    const startDate = Date.now();
    const reverseTime = selectedTime - startDate;
    const time = convertMs(reverseTime);

    if (reverseTime < 1000) {
      clearInterval(timerId);
    }

    updateInterface(time);
  }, 1000);

  refs.start.disabled = true;
};

// Ініціалізація Ліби на Input
const fp = flatpickr(refs.inputEl, options);

// Вішання слухача на "START"
refs.start.addEventListener('click', startTimer);
