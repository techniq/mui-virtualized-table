import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme();

addDecorator(storyFn => (
  <MuiThemeProvider theme={theme}>
    {storyFn()}
  </MuiThemeProvider>
));

function loadStories() {
  require('../stories/basic');
}

configure(loadStories, module);
