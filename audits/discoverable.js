function main(context) {
  fetch('/feed.xml').then(response => response.text()).then(text => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const links = [].slice.call(xml.getElementsByTagName('link'));
    const blog = links.filter(link => link.attributes.href.value.includes(window.location.pathname)).length > 0;
    const learn = document.querySelector('.w-post-signpost') ? true : false;
    context.postMessage({id: 'discoverability', pass: (blog || learn)});
  });
}

export { main };