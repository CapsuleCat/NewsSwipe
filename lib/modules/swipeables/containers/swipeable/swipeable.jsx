/* global window */
import React from 'react';
import Swipeable from 'react-swipeable';

// There is an inherit trigger offset built into
// React Swipeable, but this is here so we can
// tinker with that offset
const START_TRIGGER_OFFSET = 10;
const END_TRIGGER_OFFSET   = 10 * START_TRIGGER_OFFSET;
const FACTOR = 1.2;

const SwipeableContainer = React.createClass({
  getInitialState() {
    return { x: 0, y: 0 }
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

  onSwiped(_, deltaX, deltaY, isFlick) {
    // Delta Y is positive/up and negative/down
    // Delta X is positive/left and negative/right
    const offscreenHeight = this.props.height * 1.5;
    const offscreenWidth  = this.props.width * 1.5;

    if (deltaY > END_TRIGGER_OFFSET ) {
      this.setState({ y: -offscreenHeight });
      this.props.onSwipeUp();
    }
    else if (deltaX > END_TRIGGER_OFFSET) {
      this.setState({ x: -offscreenWidth });
      this.props.onSwipeLeft();
    }
    else if (deltaX < -END_TRIGGER_OFFSET ) {
      this.setState({ x: offscreenWidth });
      this.props.onSwipeRight();
    }
    else if (isFlick) {
      // TODO Determine flick direction
    } else {
      // reset
      this.setState({ x: 0, y: 0 });
    }
  },

  getStyles() {
    let zoomFactor = 1;
    let top = 0;
    let left = 0;

    const majorDirection = (check, other) => {
      return Math.abs( check ) >= Math.abs( other );
    };

    const minorDirection = (check, other) => {
      return majorDirection(check, other) && 
             Math.abs( check ) < START_TRIGGER_OFFSET * 4;
    };

    const minorFactor = (check) => {
      return - 0.2 * Math.abs( this.state.x ) / (START_TRIGGER_OFFSET * 4) + 1;
    };
    
    // Determine zoom factor
    if ( minorDirection( this.state.x, this.state.y ) ) {
      zoomFactor = minorFactor( this.state.x );
    } else if ( minorDirection( this.state.y, this.state.x ) ) {
      zoomFactor = minorFactor( this.state.y );
    } else {
      zoomFactor = 0.8;
    }

    // Determine offset
    if ( majorDirection(this.state.x, this.state.y) ) {
      left = 2 * this.state.x;
    } else {
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
