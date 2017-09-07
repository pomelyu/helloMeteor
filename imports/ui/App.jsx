import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Tasks from '../api/tasks.js';

import Task from './Task.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.renderTasks = this.renderTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderTasks() {
    return this.props.tasks.map( task => (
      <Task key={task._id} task={task} />
    ));
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = this._textInput.value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),
    })

    this._textInput.value = '';
  }

  render() {
    return (
      <div className="container">
        <div id="add-task-div">
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input 
              type="text"
              ref={ component => this._textInput = component}
              placeholder="Type to add new tasks"
            />
          </form>
        </div>

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