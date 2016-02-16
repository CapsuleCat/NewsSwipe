Tags = new Mongo.Collection('tags');

if (Meteor.isServer) {
  Meteor.publish('tags', () => {
    return Tags.find({});
  });
}
