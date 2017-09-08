import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check';

const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert': function (text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username, // username of logged in user
    });
  },
  'tasks.remove': function (taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked': function (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});

export default Tasks;