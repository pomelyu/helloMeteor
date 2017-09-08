import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check';

const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublish(){
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]
    });
  });
}

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

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.setChecked': function (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }    

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate': function (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});

export default Tasks;