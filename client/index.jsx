import React from 'react';
import ReactDOM from 'react-dom';

import { AppRouter } from '/client/router.jsx';

Meteor.startup(function () {
  ReactDOM.render(
    <AppRouter />,
    document.getElementById('react-container')
  );
});
