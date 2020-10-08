function main(context) {
  let pass = true;
  const images = [].slice.call(document.querySelectorAll('.w-post-content img'));
  if (images.length === 0) {
    context.postMessage({id: 'images', pass: true});
    return;
  }
  images.forEach((image, index) => {
    const node = new Image();
    node.addEventListener('load', () => {
      if (node.width >= 1600) {
        pass = false;
        const pathname = new URL(node.src).pathname;
        const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
        context.postMessage({
          id: 'images',
          pass: false,
          details: filename,
        });
      } else {
        if (index === images.length - 1 && pass) context.postMessage({id: 'images', pass: true});
      }
    });
    node.src = image.src;
  });
}

export { main };