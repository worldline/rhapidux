import { CHANGE_COLOR } from '../constants/actions';

const colorState = false;

export default (state = colorState, action) => {

  switch (action.type) {
    case CHANGE_COLOR:
      return !state;
    default:
      return state;
  }

};
