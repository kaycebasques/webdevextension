console.log('content.js');
const audits = [
  'chromestatus.js',
  'discoverable.js',
  'hero.js',
  'images.js',
  'subhead.js',
  'tags.js',
  'version.js',
  'videos.js',
  'youtube.js'
];
const urls = audits.map(audit => chrome.runtime.getURL(`audits/${audit}`));
window.addEventListener('message', e => {
  if (e.data.id === 'urls-request') {
    console.log('content.js has received urls-request message with following data:', e.data);
    window.postMessage({id: 'urls-data', urls});
  }
});

function setup() {
  function customize() {
    // TODO(kayce): Store the old values of the styles attributes before changing them
    // so that you can revert them during the teardown.
    document.querySelector('.w-actions').style.display = 'none';
    // TODO you can store old css by noting values before you change them.
    document.querySelector('.w-post-content').style.margin = '0 0 0 auto';
  }
  function init() {
    let ui = document.querySelector('.w-extension');
    if (!ui) {
      ui = document.createElement('iframe');
      ui.referrerpolicy = 'same-origin';
      ui.classList.add('w-extension');
      ui.style.width = `${document.querySelector('.w-post-content').getBoundingClientRect().left}px`;
      ui.style.height = `${document.documentElement.clientHeight}px`;
      ui.src = chrome.runtime.getURL('ui.html');
      document.body.appendChild(ui);
    }
    chrome.runtime.onMessage.addListener((request, sender) => {
      console.log({request, sender});
    });
  }
  customize();
  init();
}

function teardown() {
  document.querySelector('.w-actions').removeAttribute('style');
  document.querySelector('.w-post-content').removeAttribute('style');
  const extension = document.querySelector('.w-extension');
  if (extension) {
    extension.parentNode.removeChild(extension);
  }
}

function version() {
  const url = `https://raw.githubusercontent.com/kaycebasques/review-extension/master/manifest.json?timestamp=${Date.now()}`;
  fetch(url).then(response => response.json()).then(json => {
    console.log(json);
    if (json.version !== chrome.runtime.getManifest().version) {
      document.querySelector('.w-extension').contentWindow.postMessage(
        {id: 'version', pass: false, code: 'new-version-available'}, '*');
    } else {
      document.querySelector('.w-extension').contentWindow.postMessage(
        {id: 'version', pass: true}, '*');
    }
  });
}

// TODO(kaycebasques): Move this into setup()?
window.addEventListener('message', e => {
  if (e.data.id === 'close') teardown();
  if (e.data.id === 'ready') {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = chrome.runtime.getURL('audits.js');
    document.body.appendChild(script);
    version();
  }
  if (e.data.id === 'copy') {
    // https://github.com/w3c/webappsec-feature-policy/issues/322#issuecomment-618009921
    navigator.clipboard.writeText(e.data.markdown);
  }
});

setup();