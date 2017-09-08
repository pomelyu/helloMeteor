import { connect } from 'react-redux-meteor';

import Tasks from '../../api/tasks.js';
import { changeBackground } from '../actions/viewActions';

import App from '../components/App.jsx';

const mapTrackerToProps = (state, props) => {
  if (Meteor.subscribe('tasks').ready()) {
    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
      currentUser: Meteor.user(),
    };
  }
  return { 
    tasks: [],
    incompleteCount: 0,
    currentUser: {},
  };
};

const mapStateToProps = (state) => {
  return {
    backgroundColor: state.getIn(['view', 'backgroundColor']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeBackground: () => (dispatch(changeBackground())),
  };
};

export default connect(
  mapTrackerToProps,
  mapStateToProps,
  mapDispatchToProps,
)(App);