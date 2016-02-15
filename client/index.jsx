import React from 'react';
import ReactDOM from 'react-dom';

import { FillableContainer } from '/lib/modules/fillables/containers/fillable/fillable.jsx';

Meteor.startup(function () {
  ReactDOM.render(
    <FillableContainer />,
    document.getElementById('react-container')
  );
});
