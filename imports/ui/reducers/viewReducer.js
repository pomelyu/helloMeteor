import { ViewState } from '../constants/models.js';
import { CHANGE_BACKGROUND } from '../constants/actionTypes';

function viewReducer(state = ViewState, action){
  switch (action.type) {
    case CHANGE_BACKGROUND:
      return handleChangeBackground(state, action.payload);
      break;
    default:
      return state;
  }
}

function handleChangeBackground (state, payload) {
  return state.set('backgroundColor', payload.backgroundColor);
}

export default viewReducer;