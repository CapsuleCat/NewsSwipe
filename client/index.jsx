import React from 'react';
import ReactDOM from 'react-dom';

import { NewsArticle } from '/lib/modules/news/components/news-article/news-article.jsx';
import { FillableContainer } from '/lib/modules/fillables/containers/fillable/fillable.jsx';

const articles = [
  <NewsArticle article={{name: 'a'}} />,
  <NewsArticle article={{name: 'b'}} />
];

const getNextView = (index) => {
  if (index < articles.length) {
    return articles[index];  
  } else {
    return <div><p>nothing to show</p></div>;
  }
};

Meteor.startup(function () {
  ReactDOM.render(
    <FillableContainer getNextView={getNextView} />,
    document.getElementById('react-container')
  );
});
