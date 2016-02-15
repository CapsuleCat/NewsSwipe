import React from 'react';

const NewsArticle = ({ article }) => {
  let classes = 'news-article news-article--' + article.name;

  return (
    <article className={classes}>
      <h1>React + Redux Tutorial</h1>
      <h2>Preamble</h2>
      <p>React appears to have won the day when it comes to the JavaScript 
       frameworks. One of React’s many strengths is the library’s narrow focus on
       only the view. It’s small scope allow’s it’s API to be small and compact making
       for a relatively small…</p>
    </article>
  );
};

export { NewsArticle };
