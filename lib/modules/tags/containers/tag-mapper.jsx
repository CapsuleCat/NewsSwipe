import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';

const TagMapperContainer = React.createClass({
  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {
      tags: []
    }
  },

  getMeteorData() {
    let handle = Meteor.subscribe( 'tags' );
    let tags = this.props.tags;
    let foundTags = [];

    if ( handle.ready() ) {
      foundTags = Tags.find({
        name: {
          $in: tags
        }
      }).fetch();
    }

    tags = tags.map((tag) => {
      let foundTag = foundTags.find(fTag => {
        return fTag.name === tag;
      });

      if (foundTag) {
        return foundTag;
      } else {
        return {
          name: tag
        };
      }
    });

    return {
      tags: tags
    }
  },

  render() {
    let childrenWithProps = null;

    if (this.data) {
      childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { tags: this.data.tags });
      });
    } else {
      let tags = this.props.tags.map((tag) => {
        return {
          name: tag
        };
      });

      childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { tags });
      });
    }

    return <div>{childrenWithProps}</div>
  }
});

export { TagMapperContainer };