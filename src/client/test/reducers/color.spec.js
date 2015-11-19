import { expect } from 'chai';

import color from '../../reducers/color';
import { CHANGE_COLOR } from '../../constants/actions';

describe('Color reducer', () => {

  it('should return initial state', () => {
    expect(color(undefined, {})).to.be.false;
  });

  it('should toggle initial state', () => {
    expect(color(undefined, { type: CHANGE_COLOR })).to.be.true;
  });

  it('should toggle alternate state', () => {
    expect(color(true, { type: CHANGE_COLOR })).to.be.false;
  });

  it('should ignore unknown action type', () => {
    expect(color(true, { type: 'unknown' })).to.be.true;
  });

});
