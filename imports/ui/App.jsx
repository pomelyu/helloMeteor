import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Tasks from '../api/tasks.js';

import Task from './Task.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.renderTasks = this.renderTasks.bind(this);
  }

  renderTasks() {
    return this.props.tasks.map( task => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <head>
          <h1>Todo List</h1>
        </head>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }
}

App.PropTypes = {
  tasks: PropTypes.array.isRequired,
}

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  }
}, App);