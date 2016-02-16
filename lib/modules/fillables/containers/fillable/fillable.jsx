import React from 'react';
import ReactTimeout from 'react-timeout';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { SwipeableContainer } from '/lib/modules/swipeables/containers/swipeable/swipeable.jsx';

const FillableContainer = ({getNextView}) => {
  const Fillable = React.createClass({
    getInitialState() {
      return {
        index: 0,
        view: this.createSwipeable(getNextView(0)),
        lastDirection: 'none'
      }
    },

    createSwipeable(innerView) {
      // Needs a date because React is dumb
      return (
        <SwipeableContainer
            key={+new Date()}
            onSwipeUp={this.onSwipeUp}
            onSwipeRight={this.onSwipeRight}
            onSwipeLeft={this.onSwipeLeft}>
          {innerView}
        </SwipeableContainer>
      );
    },

    nextView() {
      const { setTimeout } = this.props.reactTimeout;

      setTimeout(function(index) {
          let newIndex = index + 1;
          this.setState({
            view: this.createSwipeable(
              getNextView(newIndex)
            ),
            index: newIndex
          });
        }.bind(this, this.state.index), 1000
      );
    },

    onSwipeUp() {
      this.nextView();

      this.setState({
        lastDirection: 'up'
      });
    },

    onSwipeLeft() {
      this.nextView();

      this.setState({
        lastDirection: 'left'
      });
    },

    onSwipeRight() {
      this.nextView();

      this.setState({
        lastDirection: 'right'
      });
    },

    render() {
      return (
        <ReactCSSTransitionGroup
            transitionName={"slide-" + this.state.lastDirection}
            transitionEnterTimeout={0}
            transitionLeaveTimeout={500}>
          {this.state.view}
        </ReactCSSTransitionGroup>
      );
    }
  });

  const FillableWithTimeout = ReactTimeout(Fillable);

  return <FillableWithTimeout />;
};

export { FillableContainer };
