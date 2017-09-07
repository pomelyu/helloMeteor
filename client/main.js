import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './main.html';

Session.set('todos', [
  {
    label: 'Buy something',
    done: 'true',
  },
  {
    label: 'Ride bike',
  },
  {
    label: 'Playing',
  }
]);

Template.todosList.helpers({
  todos: function () {
    return Session.get('todos');
  },
});

Template.todosList.events({
  'click .add-todo': function (event, instance) {
    var todos = Session.get('todos');
    todos.push({
      label: 'New todo',
    });
    Session.set('todos', todos);
  },
});
