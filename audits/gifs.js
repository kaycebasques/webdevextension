function main(context) {
  let pass = true;
  const images = [].slice.call(document.querySelectorAll('.w-post-content img'));
  if (images.length === 0) {
    context.postMessage({id: 'gifs', pass: true, description: 'The page has no GIFs.'});
    return;
  }
  images.forEach((image, index) => {
    // https://stackoverflow.com/a/3884711/1669860
    const filetype = image.src.slice(-3).toUpperCase();
    if (filetype === 'GIF') {
      pass = false;
      context.postMessage({
        id: 'gifs', 
        pass: false, 
        details: image.src,
        description: '[Convert](https://web.dev/replace-gifs-with-videos/) the following GIFs to animated videos:'
      });
    }
  });
  if (pass) context.postMessage({id: 'gifs', pass: true, description: 'None of the page\'s images are GIFs.'});
}

export { main };