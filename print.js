import { receiver } from './broadcast.js';

const placeholder_functionality = (number) => {
  const h1 = document.createElement('h1');
  h1.append(`Tarot Number: ${number} selected`);
  document.querySelector('main').replaceChildren(h1);
}
const action = (msg) => {
  console.log(`tarot number ${msg} selected`);
  placeholder_functionality(msg);
}

receiver(action);
