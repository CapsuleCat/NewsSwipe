import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { AppPostings } from '/lib/modules/app/containers/postings/postings.jsx';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppPostings}>
      <Route path="postings" component={AppPostings}>
        <Route path="/posting/:id" component={AppPostings} />
      </Route>
    </Route>
  </Router>
);

export { AppRouter };