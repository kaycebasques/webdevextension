const state = {};
const tasks = {
  discoverability: {
    description: 'Make the page discoverable from either web.dev/blog (add the `blog` [tag](https://web.dev/handbook/tags#add-tags)) or a web.dev/learn collection (add it to one of the `src/site/_data/paths` JSON files).'
  },
  hero: {
    description: undefined,
  },
  images: {
    description: 'Resize the width of the following images to 1600px or less:',
    details: [],
  },
  // links: {
  //   description: 'Fix the following broken links:',
  //   details: [],
  // },
  subhead: {
    description: 'Add a subheading to the page: https://web.dev/handbook/yaml-front-matter/#subhead'
  },
  tags: {
    description: 'Add relevant tags to the post: https://web.dev/handbook/yaml-front-matter/#tags',
  },
  youtube: {
    description: 'Use the YouTube shortcode to embed YouTube videos: https://web.dev/handbook/markup-media/#youtube',
    details: [],
  }
};

// Using onmessage rather than addEventListener for the same reason
// as onlick (see below).
window.onmessage = (e) => {
  const id = e.data.id;
  switch (id) {
    case 'hero':
      if (e.data.code === 'no-hero') {
        tasks.hero.description = 'Add a hero image: https://web.dev/handbook/markup-media/#hero';
      }
      if (e.data.code === 'incorrect-dimensions') {
        tasks.hero.description = 'Resize the hero image: https://web.dev/handbook/markup-media/#hero';
      }
      break;
    case 'images':
      tasks.images.details.push(e.data.details);
      break;
    // In this case we just want to update the UI, we don't want to add
    // the data to the tasks object.
    case 'version':
      update(e.data);
      return;
  }
  tasks[id].pass = e.data.pass;
  update(e.data);
};

// Using onclick here rather than addEventListener so that the
// handler is not registered multiple times. E.g. user opens the
// extension, then closes it, then opens it again.
document.querySelector('#close').onclick = () => {
  window.parent.postMessage({id: 'close'}, '*');
};

function update(data) {
  const section = document.getElementById(data.id);
  if (data.pass) {
    section.querySelector('.pass').classList.add('visible');
    section.querySelector('.status').textContent = 'Pass';
    return;
  }
  section.querySelector('.fail').classList.add('visible');
  section.querySelector('.status').textContent = 'Fail';
  const details = section.querySelector('.details');
  if (details) {
    details.classList.add('visible');
    const li = document.createElement('li');
    li.textContent = data.details;
    details.appendChild(li);
  }
}

// Using onclick for the same reason as document.querySelector('#close').onclick
// (see above).
document.querySelector('#copy').onclick = () => {
  let markdown = '(The requested changes below were auto-generated by the web.dev content review extension)\n\n';
  for (id in tasks) {
    const task = tasks[id];
    if (task.pass) continue;
    markdown = `${markdown}- [ ] ${task.description}\n`;
    if (task.details) {
      task.details.forEach(detail => {
        markdown = `${markdown}  - [ ] ${detail}\n`;
      });
    }
  }
  // https://github.com/w3c/webappsec-feature-policy/issues/322#issuecomment-618009921
  window.parent.postMessage({id: 'copy', markdown}, '*');
};

window.parent.postMessage({id: 'ready'}, '*');