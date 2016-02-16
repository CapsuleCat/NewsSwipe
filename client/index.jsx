import React from 'react';
import ReactDOM from 'react-dom';

import { Posting } from '/lib/modules/postings/components/posting/posting.jsx';
import { AnimateContainer } from '/lib/modules/swipeables/containers/animate/animate.jsx';
import { SwipeableContainer } from '/lib/modules/swipeables/containers/swipeable/swipeable.jsx';

const articles = [
  <Posting posting={{
    title: 'My Title',
    description: 'My Description',
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=2b9eab49407436fcdf8c92b37d784425',
    tags: [
      'web dev',
      'design',
      'php'
    ]
  }} />,
  <Posting posting={{
    title: 'My Title 2',
    description: 'My Description',
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=2b9eab49407436fcdf8c92b37d784425'
  }}  />
];

const getNextView = (index) => {
  if (index < articles.length) {
    return articles[index];  
  } else {
    return <div><p>nothing to show</p></div>;
  }
};

const getNextSwipeable = (index, swipes) => (
  <SwipeableContainer
      key={+new Date()}
      height={window.screen.height - 90}
      onSwipeUp={swipes.onSwipeUp}
      onSwipeRight={swipes.onSwipeRight}
      onSwipeLeft={swipes.onSwipeLeft}>
    {getNextView(index)}
  </SwipeableContainer>
);

Meteor.startup(function () {
  ReactDOM.render(
    <AnimateContainer getNextSwipeable={getNextSwipeable} />,
    document.getElementById('react-container')
  );
});
