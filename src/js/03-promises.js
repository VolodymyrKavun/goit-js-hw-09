// Підключення Ліби "Notiflix"
import Notiflix from 'notiflix';

// Доступ елементів
const refs = {
  form: document.querySelector('.form'),
};

// Вішання слухача на елемент
refs.form.addEventListener('submit', onSubmit);

// Ф-я доступу до значень форми та перебору + (reset)
function onSubmit(e) {
  e.preventDefault();

  const delayEl = Number(e.currentTarget.delay.value);
  const stepEl = Number(e.currentTarget.step.value);
  const amountEl = Number(e.currentTarget.amount.value);
  let reverseDelay = delayEl;

  for (let i = 1; i <= amountEl; i += 1) {
    createPromise(i, reverseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    reverseDelay += stepEl;
  }
  e.currentTarget.reset();
}

// Ф-я створення Промісів
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
