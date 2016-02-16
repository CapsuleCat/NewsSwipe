import React from 'react';
import ReactTimeout from 'react-timeout';
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
const AnimateContainer = ({getNextSwipeable}) => {
  const Animated = React.createClass({
    getInitialState() {
      return {
        index: 0,
        view: getNextSwipeable(0, {
          onSwipeUp: this.onSwipeUp,
          onSwipeRight: this.onSwipeRight,
          onSwipeLeft: this.onSwipeLeft
        }),
        lastDirection: 'none'
      }
    },

    nextViewTimeout(getNextSwipable, index, swipes) {
      let newIndex = index + 1;

      this.setState({
        view: getNextSwipeable(newIndex, swipes),
        index: newIndex
      });
    },

    nextView() {
      const { setTimeout } = this.props.reactTimeout;
      const callback = this.nextViewTimeout.bind(
        this,
        getNextSwipeable,
        this.state.index,
        {
          onSwipeUp: this.onSwipeUp,
          onSwipeRight: this.onSwipeRight,
          onSwipeLeft: this.onSwipeLeft
        }
      );

      setTimeout(callback, 1000);
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

  const AnimatedTimeout = ReactTimeout(Animated);

  return <AnimatedTimeout />
};

export { AnimateContainer };
