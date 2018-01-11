import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

const theme = createMuiTheme();

addDecorator(storyFn => (
  <Reboot>
    <MuiThemeProvider theme={theme}>
      {storyFn()}
    </MuiThemeProvider>
  </Reboot>
));

function loadStories() {
  require('../stories/basic');
}

configure(loadStories, module);
