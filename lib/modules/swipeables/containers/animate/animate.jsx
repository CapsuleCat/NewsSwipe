import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

/**
 * The Animate Container
 *
 * This container will handle animating
 * Components that are or extend the
 * SwipeableContainer.
 *
 * Expects a function takes an index and 
 * swipe direction callbacks, and returns
 * a Component.
 *
 * Usage:
 *
 * ```
 * <AnimateContainer getNextSwipeable={myFunction} />
 * ```
 */
const AnimateContainer = React.createClass({
  getInitialState() {
    return {
      lastDirection: 'none'
    }
  },

  onSwipeUp() {
    this.setState({
      lastDirection: 'up'
    });

    this.props.onSwipeUp();
  },

  onSwipeLeft() {
    this.setState({
      lastDirection: 'left'
    });

    this.props.onSwipeLeft();
  },

  onSwipeRight() {
    this.setState({
      lastDirection: 'right'
    });

    this.props.onSwipeRight();
  },

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        ...(child.props),
        onSwipeRight: this.onSwipeRight,
        onSwipeLeft: this.onSwipeLeft,
        onSwipeUp: this.onSwipeUp
      });
    });

    return (
      <ReactCSSTransitionGroup
          transitionName={"slide-" + this.state.lastDirection}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={500}>
        {childrenWithProps}
      </ReactCSSTransitionGroup>
    );
  }
});

export { AnimateContainer };
