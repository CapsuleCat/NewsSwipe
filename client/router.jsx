import React from 'react';
import { render } from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from '/lib/router/react-layout.jsx';

import { AppPostings } from '/lib/modules/app/containers/postings/postings.jsx';

const MainLayout = ({content}) => {
  return (
    <div>
      {content}
    </div>
  );
}

FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <AppPostings params={{id: 0}}/>
    });
  }
});

FlowRouter.route('/posting/:id', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <AppPostings params={params}/>
    });
  }
});
