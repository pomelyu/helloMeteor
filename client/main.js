import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

// "helpers" setup the data provided to template
// The below function setup the data provied to template "hello"
Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
    // old version:
    // return Session.get('counter');
  },
});

// "events" setup the event listener to the template
Template.hello.events({
  // "click button" is composed by "click", the event name, and "button", the jquery selector.
  // Hence, "click button" would be triggered as any of button be clicked
  // Another example: "click .increment-counter", "click #increment-counter"
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    // old version:
    // Session.set('counter', Session.get('counter') + 1);
  },
});
