Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('subbed', function() {
  return Subbed.find();
});

Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish('contacts', function() {
  return Contacts.find();
});