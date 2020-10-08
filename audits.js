// import { hero } from chrome.runtime.getURL('audits/hero.js');

// console.log(chrome.runtime.getURL('audits/hero.js'));
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
})
// hero();

// (() => {
//   function postMessage(data) {
//     const extension = document.querySelector('.w-extension');
//     extension.contentWindow.postMessage(data, '*');
//   }
//   function audit() {
//     const ui = document.querySelector('.w-extension');
//     function filterLinks(links) {
//       [
//         'w-breadcrumbs__link',
//         'w-author__name-link',
//         'w-author__link',
//       ].forEach(siteLink => {
//         links = links.filter(link => !link.classList.contains(siteLink));
//       });
//       links = links.filter(link => !RegExp('/authors/').test(link.href));
//       links = links.filter(link => !RegExp('Improve article').test(link.textContent));
//       links = links.map(link => link.href);
//       return links;
//     }

//     function caniuse() {

//     }


//     function headings() {

//     }

//     // Not used yet.
//     function isBlog() {
//       return document.querySelector('.w-breadcrumbs__link[href="/blog"]') ? true : false;
//     }
//     // TODO(kaycebasques): Filter out same-page section links.
//     function links() {
//       let links = [].slice.call(document.querySelectorAll('.w-post-content a'));
//       links = filterLinks(links);
//       // TODO(kaycebasques): Add a callback?
//       chrome.runtime.sendMessage({id: 'links', data: links});
//     }


//     function psi() {
//       // TODO(kaycebasques): Use multiple category=X params
//       // PSI API is returning HTTP 400 (invalid request)
//       const url = `url=${encodeURIComponent(window.location)}`;
//       const key = 'key=AIzaSyCGRsPbQXhA3JdbYixZlFJRlGVyTUvPVik';
//       //const categories =
//       //    `category=${encodeURIComponent(['accessibility', 'best-practices', 'performance', 'pwa', 'seo'].join(','))}`
//       //fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${url}&${categories}&${key}`)
//       //    .then(response => response.text())
//       //    .then(text => console.log(text));
//     }
//     function sectionLinks() {
//       let links = [].slice.call(document.querySelectorAll('.w-post-content a'));
//       links = filterLinks(links);
//       links.forEach(link => {
//         const url = new URL(link);
//         const a = `${window.location.origin}${window.location.pathname}`;
//         const b = `${url.origin}${url.pathname}`;
//         if (a !== b) return;
//         // TODO(kaycebasques): We need the link node here but filterLinks converted
//         // it into a string
//         if (!document.querySelector(url.hash)) console.log(link);
//       });
//     }

//     // Create a manual audit that checks that the title is similar to the URL
//     function title() {

//     }
//     // TODO(kaycebasques): Move this because it's not a content audit.
//     // It's here right now because we don't want to run it until the Extension UI is ready.
//     function version() {
//       const url = `https://raw.githubusercontent.com/kaycebasques/review-extension/master/manifest.json?timestamp=${Date.now()}`;
//       fetch(url).then(response => response.json()).then(json => {
//         if (json.version !== chrome.runtime.getManifest().version) {
//           postMessage({id: 'version', pass: false, code: 'new-version-available'});
//         } else {
//           postMessage({id: 'version', pass: true});
//         }
//       });
//     }


//     chromestatus();
//     discoverable();
//     hero();
//     images();
//     //links();
//     subhead();
//     tags();
//     //headings();
//     //psi();
//     //sectionLinks();
//     version();
//     videos();
//     youtube();
//   }

//   function teardown() {
//     document.querySelector('.w-actions').removeAttribute('style');
//     document.querySelector('.w-post-content').removeAttribute('style');
//     const extension = document.querySelector('.w-extension');
//     if (extension) {
//       extension.parentNode.removeChild(extension);
//     }
//   }

//   setup();
//   //audit();
// })();