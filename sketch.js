import { notify } from './broadcast.js';
import { install, to_image_name, location_to_tarot } from './lib.js';

const STORAGE_KEY_KEY = 'oracle_key';
const KEY_FREE = 'free';

// FIXME: Warning: naive interpolate.
const translate = (x) => Math.round((100 / 255) * x);

const toRequest = (key) => {
  if (key && key !== KEY_FREE) {
    const url = new URL('https://api.quantumnumbers.anu.edu.au?length=1&type=uint8');
    const options = {
      headers: {
        'x-api-key': key 
      }
    };
    const request = new Request(url, options);
    return request;
  } else {
    const url = new URL('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8');
    const request = new Request(url);
    return request;
  }
}

const call = async () => {
  const key = get_key();
  const request = toRequest(key);
  const response = await fetch(request);
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

const start = () => {
    const tarot = location_to_tarot();
    if(tarot) {
      show(tarot);
    } else {
      reading();
    }
}

const save_key = (key) => {
  sessionStorage.setItem(STORAGE_KEY_KEY, key);
};

const has_key = () => {
  return !!sessionStorage.getItem(STORAGE_KEY_KEY);
};

const get_key = () => {
  return sessionStorage.getItem(STORAGE_KEY_KEY);
}

const handle_key_submit = (e) => {
  e.preventDefault();
  e.stopPropagation();
  save_key(e.target[0].value);
  start();
}

const handle_use_free = () => {
  save_key(KEY_FREE);
  start();
}

const setup = () => {
  if (!has_key() && !location_to_tarot()) {
    document.querySelector('h1').remove();
    const form = document.querySelector('form');
    form.addEventListener('submit', handle_key_submit);  
    const button = document.querySelector('.free');
    button.addEventListener('click', handle_use_free);
    form.style.display='block';
    button.style.display='block';
  } else {
    start();
  }
}

const main = () => {
  install();
  setup();
}

main();
