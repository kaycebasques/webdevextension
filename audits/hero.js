function main(context) {
  const hero = document.querySelector('.w-hero');
  if (!hero) {
    context.postMessage({id: 'hero', pass: false, code: 'no-hero',
        task: 'Add a hero image: https://web.dev/handbook/markup-media/#hero'});
    return;
  }
  const image = new Image();
  image.addEventListener('load', () => {
    if ((image.width === 3200) && (image.height === 960)) {
      context.postMessage({id: 'hero', pass: true});
    } else {
      context.postMessage({id: 'hero', pass: false, code: 'incorrect-dimensions',
          task: 'Resize the hero image: https://web.dev/handbook/markup-media/#hero'});
    }
  });
  image.src = document.querySelector('.w-hero').src;
}

export { main };