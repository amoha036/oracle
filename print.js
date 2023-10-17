import { receiver } from './broadcast.js';
import { location_to_tarot, to_image_name } from './lib.js';

let current_tarot;

const set_tarot = (tarot) => {
  current_tarot = tarot;
  document.querySelector('button').disabled = false;
  document.querySelector('h2').replaceChildren(`Current Tarot: ${tarot}`);
  document.querySelector('img').src = `./${to_image_name(tarot)}`;
}

function set_print() {
  const close_print = () => {
    document.body.removeChild(this);
  };
  this.contentWindow.onbeforeunload = close_print;
  this.contentWindow.onafterprint = close_print;
  this.contentWindow.print();
}

const print =  () => {
  const hideFrame = document.createElement("iframe");
  hideFrame.onload = set_print;
  hideFrame.style.display = "none";
  hideFrame.src = `/index.html?t=${current_tarot}`;
  document.body.appendChild(hideFrame);
}

const init = () => {
  document.querySelector('button').addEventListener("click", print);
  receiver(set_tarot);
}

const main = () => {
  const t = location_to_tarot();
  if(t) {
    set_tarot(t);
  }
  init();
}

main();
