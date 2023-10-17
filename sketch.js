import { notify } from './broadcast.js';
import { install, to_image_name, location_to_tarot } from './lib.js';

// FIXME: Warning: naive interpolate.
const translate = (x) => Math.round((100 / 255) * x);

const call = async () => {
  const url = new URL('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8');
  const response = await fetch(url);
  const json = await response.json();
  if (!json.success) {
    throw new Error("API Failure", { cause: json });
  }
  return json.data[0];
}

const load = (image_name) => {
  let img = document.querySelector('img');
  if (!img) {
    img = document.createElement('img')
    document.querySelector('main').replaceChildren(img);
  }
  img.src = image_name; 
}

const show = (tarot) => {
  load(to_image_name(tarot));
  notify(tarot);
}

const reading = async () => {
  const data = await call();
  const tarot = translate(data, 0, 100);
  show(tarot);
}

const main = () => {
  install();
  const tarot = location_to_tarot();
  if(tarot) {
    show(tarot);
  } else {
    reading();
  }
}

main();
