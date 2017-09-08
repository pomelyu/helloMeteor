import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

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
    return filterdTasks.map( task => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = (task.owner === currentUserId);

      return (
        <Task 
          key={task._id} 
          task={task} 
          showPrivateButton={showPrivateButton}
        />
      )
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = this._textInput.value.trim();

    Meteor.call('tasks.insert', text);

    this._textInput.value = '';
  }

  toggleHideCompleted(){
    this.setState({ hideCompleted: !this.state.hideCompleted });
  }

  render() {
    return (
      <div className="container">
        <div id="add-task-div" style={{ background: this.props.backgroundColor }}>
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

          <button onClick={this.props.changeBackground} style={{ marginLeft: 20 }}>Change Color</button>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit}>
              <input 
                type="text"
                ref={ component => this._textInput = component}
                placeholder="Type to add new tasks"
              />
            </form>: ''
          }
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
  currentUser: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}

export default App;