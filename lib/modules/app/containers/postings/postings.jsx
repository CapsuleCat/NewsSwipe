import React from 'react';
import ReactTimeout from 'react-timeout';

import { Posting } from '/lib/modules/postings/components/posting/posting.jsx';
import { AnimateContainer } from '/lib/modules/swipeables/containers/animate/animate.jsx';
import { SwipeableContainer } from '/lib/modules/swipeables/containers/swipeable/swipeable.jsx';
import { browserHistory } from 'react-router'

const postings = [
  {
    _id: 12344242,
    title: 'My Title',
    description: 'My Description',
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=2b9eab49407436fcdf8c92b37d784425',
    tags: [
      'web dev',
      'design',
      'php'
    ]
  },
  {
    _id: 23984802,
    title: 'My Title 2',
    description: 'My Description',
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=2b9eab49407436fcdf8c92b37d784425'
  }
];

var AppPostings = React.createClass({
  getInitialState() {
    return {
      posting: null,
      timestamp: null
    }
  },

  componentDidMount() {
    this.setState({
      posting: postings[this.props.params.id || 0],
      timestamp: +new Date()
    });
  },

  postSwipeCallback() {
    const { setTimeout } = this.props.reactTimeout;

    setTimeout(function () {
      this.setState({
        posting: postings[1],
        timestamp: +new Date()
      });
      browserHistory.push('/posting/' + 1);
    }.bind(this), 1000);
  },

  onSwipeLeft() {
    this.postSwipeCallback();
  },

  onSwipeRight() {
    this.postSwipeCallback();
  },

  onSwipeUp() {
    this.postSwipeCallback();
  },

  render() {
    // TODO loading
    if ( this.state.posting === null ) {
      return <div></div>
    }

    return (
      <AnimateContainer
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          onSwipeUp={this.onSwipeUp}>
        <SwipeableContainer
            key={this.state.timestamp}
            height={window.screen.height - 90}>
          <Posting posting={this.state.posting} />
        </SwipeableContainer>
      </AnimateContainer>
    );
  }
});

AppPostings = ReactTimeout(AppPostings);

export { AppPostings };
