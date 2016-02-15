import React from 'react';

import { SwipeableContainer } from '/lib/modules/swipeables/containers/swipeable/swipeable.jsx';
import { NewsArticle } from '/lib/modules/news/components/news-article/news-article.jsx';

const articles = [
  {
    name: 'a'
  },
  {
    name: 'b'
  }
];

const FillableContainer = React.createClass({
  getInitialState() {
    return {
      index: 0,
      fillable: this.createSwipeable(articles[0]),
      timeouts: []
    }
  },

  createSwipeable(article) {
    // Needs a date because React is dumb
    return (
      <SwipeableContainer
          key={+new Date()}
          onSwipeUp={this.onSwipeUp}
          onSwipeRight={this.onSwipeRight}
          onSwipeLeft={this.onSwipeLeft}>
        <NewsArticle article={article} />
      </SwipeableContainer>
    );
  },

  // TODO clean this up
  nextArticle() {
    let timeouts = this.state.timeouts;

    timeouts.push(
      window.setTimeout(function() {
        let newFillables = this.state.fillables;
        this.setState({
          fillable: this.createSwipeable(
            articles[this.state.index + 1]
          ),
          index: this.state.index + 1
        });
      }.bind(this), 1000)
    );

    this.setState({
      timeouts: timeouts
    }); 
  },

  // TODO use a timeout mixin
  componentWillUnmount() {
    this.state.timeouts.forEach((timeout) => {
      window.clearTimeout(timeout);
    }); 
  },

  onSwipeUp() {
    this.nextArticle();
  },

  onSwipeLeft() {
    this.nextArticle();
  },

  onSwipeRight() {
    this.nextArticle();
  },

  // TODO wrap in a react transition element
  render() {
    return (
      <div className="fillable-container">
        {this.state.fillable}
      </div>
    );
  }
});

export { FillableContainer };
