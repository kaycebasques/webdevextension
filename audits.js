function postMessage(data) {
  document.querySelector('.w-extension').contentWindow.postMessage(data, '*');
}
const context = {
  postMessage
}
window.postMessage({id: 'urls-request'});
window.addEventListener('message', e => {
  if (e.data.id === 'urls-data') {
    e.data.urls.forEach(url => {
      import(url).then(module => module.main(context));
    });
  }
});