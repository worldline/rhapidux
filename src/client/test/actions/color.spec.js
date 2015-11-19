import { expect } from 'chai';

import { CHANGE_COLOR } from '../../constants/actions';
import { onChangeColorClick } from '../../actions/color';

describe('Color actions', () => {

  it('should create an action to change color', () => {
    expect(onChangeColorClick()).to.deep.equal({
      type: CHANGE_COLOR
    });
  });

});
