function main(context) {
  const links = [].slice.call(document.querySelectorAll('.w-post-content a'));
  const chromestatus = links.filter(link => link.href.includes('chromestatus.com/features'));
  if (chromestatus.length === 0) {
    context.postMessage({id: 'chromestatus', pass: true});
    return;
  }
  chromestatus.forEach(link => {
    context.postMessage({id: 'chromestatus', pass: false, details: link.href});
  });
}

export { main };