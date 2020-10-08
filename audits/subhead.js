function main(context) {
  context.postMessage({id: 'subhead', 
      pass: (document.querySelector('.w-article-header__subhead') ? true : false)});
}

export { main };