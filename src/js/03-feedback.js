import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('label [name="email"]');
const textareaEl = document.querySelector('label [name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

const handleInput = function () {
  const email = emailEl.value;
  const message = textareaEl.value;
  const formData = {
    email,
    message,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
};
formEl.addEventListener('input', throttle(handleInput, 500));

const handleSubmit = function (event) {
  event.preventDefault();
  const email = emailEl.value;
  const message = textareaEl.value;
  if (email == '' || message == '') {
    alert('Enter both email and message input!');
    formEl.reset();
    return false;
  }
  const formData = {
    email,
    message,
  };
  console.log(formData);
  formEl.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
};
formEl.addEventListener('submit', handleSubmit);

const onPageLoad = function () {
  const localStorageValue = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (localStorageValue) {
    emailEl.value = localStorageValue.email;
    textareaEl.value = localStorageValue.message;
  }
};
onPageLoad();
