/* global window */
import React from 'react';
import Swipeable from 'react-swipeable';

// There is an inherit trigger offset built into
// React Swipeable, but this is here so we can
// tinker with that offset
const START_TRIGGER_OFFSET = 10;
const END_TRIGGER_OFFSET = 10 * START_TRIGGER_OFFSET;
const FACTOR = 1.2;

const SwipeableContainer = React.createClass({
  getInitialState() {
    return {
      x: 0,
      y: 0
    }
  },

  getDefaultProps() {
    let initialSizes;

    if (typeof window !== 'undefined') {
      initialSizes = {
        height: window.screen.height,
        width: window.screen.width
      }
    } else {
      initialSizes = {
        height: 0,
        width: 0
      }
    }

    return {
      ...initialSizes,
      onSwipeUp: () => {},
      onSwipeLeft: () => {},
      onSwipeRight: () => {}
    }
  },

  // Note: deltas always comes as a positive integers

  onSwipingUp(_, deltaY) {
    this.setState({
      y: -deltaY * FACTOR
    });
  },

  onSwiped(_, deltaX, deltaY, isFlick) {
    // Delta Y is positive/up and negative/down
    // Delta X is positive/left and negative/right

    if (deltaY > END_TRIGGER_OFFSET ) {
      this.setState({
        y: -this.props.width * 1.5
      });

      this.props.onSwipeUp();
    } else if (deltaX > END_TRIGGER_OFFSET) {
      this.setState({
        x: -this.props.height * 1.5
      });

      this.props.onSwipeLeft();
    } else if (deltaX < -END_TRIGGER_OFFSET ) {
      this.setState({
        x: this.props.height * 1.5
      });

      this.props.onSwipeRight();
    } else if (isFlick) {
      // TODO Determine flick direction
    } else {
      // reset
      this.setState({
        x: 0,
        y: 0
      });
    }
  },

  onSwipingLeft(_, deltaX) {
    this.setState({
      x: -deltaX * FACTOR
    });
  },

  onSwipingRight(_, deltaX) {
    this.setState({
      x: deltaX * FACTOR
    });
  },

  getStyles() {
    let zoomFactor = 1;
    if ( Math.abs( this.state.x ) >= Math.abs( this.state.y ) && 
         Math.abs( this.state.x ) < START_TRIGGER_OFFSET * 2 ) {
      zoomFactor = - 0.2 * Math.abs( this.state.x ) / (START_TRIGGER_OFFSET * 2) + 1;
    } else if ( Math.abs( this.state.y ) >= Math.abs( this.state.x ) &&
                Math.abs( this.state.y ) < START_TRIGGER_OFFSET * 2 ) {
      zoomFactor = - 0.2 * Math.abs( this.state.y ) / (START_TRIGGER_OFFSET * 2) + 1;
    } else {
      zoomFactor = 0.8;
    }

    let top = 0;
    let left = 0;
    if ( Math.abs( this.state.x ) > START_TRIGGER_OFFSET ) {
      left = 2 * this.state.x;
    } else if ( Math.abs( this.state.y ) > START_TRIGGER_OFFSET ) {
      top = 2 * this.state.y;
    }

    return {
      transform: 'translate(' + left + 'px, ' + top + 'px) scale(' + zoomFactor + ')'
    };
  },

  render() {
    return (
      <Swipeable
        onSwipingUp={this.onSwipingUp}
        onSwipingLeft={this.onSwipingLeft}
        onSwipingRight={this.onSwipingRight}
        onSwiped={this.onSwiped}
        delta={START_TRIGGER_OFFSET}>
        <div className="swipeable" style={this.getStyles()}>
          {this.props.children}
        </div>
      </Swipeable>
    );
  }
});

export { SwipeableContainer };
