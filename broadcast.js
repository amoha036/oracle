const broadcast = new BroadcastChannel('oracle_tarot');

export const notify = (message) => { broadcast.postMessage(message); }
export const receiver = (fn) => {
  broadcast.addEventListener('message', (e) => { fn(e.data) });
};
