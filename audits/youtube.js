function main(context) {
  let pass = true;
  // Using `youtu` rather than `youtube` on the off-chance that someone uses
  // the YouTube short URL version, e.g. `https://youtu.be/GLUB2yzk0ZQ`.
  let videos = [].slice.call(document.querySelectorAll('iframe[src*="youtu"]'));
  if (videos.length === 0) {
    context.postMessage({id: 'youtube', pass: true});
    return;
  }
  videos.forEach((video, index) => {
    // There's more markup that we could check for, but this is probably good enough
    // because it ensures that the proper styling is being added and the iframe is
    // being loaded efficiently.
    const valid = video.parentNode.classList.contains('w-youtube') &&
        video.classList.contains('w-youtube__embed') &&
        video.loading === 'lazy';
    if (!valid) {
      pass = false;
      context.postMessage({
        id: 'youtube',
        pass: false,
        details: video.src,
      });
    }
    if (index === videos.length - 1 && pass) context.postMessage({id: 'youtube', pass: true});
  });
}

export { main };