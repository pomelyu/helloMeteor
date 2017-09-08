import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
import AppContainer from '../imports/ui/containers/AppContainer.js';

import store from '../imports/ui/store/configStore';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <AppContainer />
    </Provider>, document.getElementById('render-target')
  );
});