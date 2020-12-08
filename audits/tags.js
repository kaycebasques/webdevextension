function main(context) {
  context.postMessage({
    id: 'tags', 
    pass: document.querySelector('.w-chip') ? true : false,
    task: 'Add relevant tags to the post: https://web.dev/handbook/tags',
  });
}

export { main };