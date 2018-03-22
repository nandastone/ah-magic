import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories');
  require('../src/stories/ItemTitle');
}

configure(loadStories, module);
