import randomColor from 'randomcolor';

import { CHANGE_BACKGROUND } from '../constants/actionTypes';

export const changeBackground = () => ({
  type: CHANGE_BACKGROUND,
  payload: { backgroundColor: randomColor() },
})