import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Tasks from '../api/tasks.js';

import Task from './Task.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      hideCompleted: false,
    };

    this.renderTasks = this.renderTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
  }

  renderTasks() {
    var filterdTasks = this.props.tasks;
    if (this.state.hideCompleted){
      filterdTasks = filterdTasks.filter(task => !task.checked);
    }
    return filterdTasks.map( task => (
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

  toggleHideCompleted(){
    this.setState({ hideCompleted: !this.state.hideCompleted });
  }

  render() {
    return (
      <div className="container">
        <div id="add-task-div">
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input 
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide completed Task
          </label>

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
  incompleteCount: PropTypes.number.isRequired,
}

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  }
}, App);