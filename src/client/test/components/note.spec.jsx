import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { spy } from 'sinon/pkg/sinon';

import '../utils';

import Note from '../../components/note/note.jsx';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithTag: findByTag,
  Simulate: { click }
} = TestUtils;

describe('Note component', () => {

  const setup = (props) => {
    const defaultProps = {
      color: false,
      actions: {
        onChangeColorClick: spy()
      },
      ...props
    };
    const component = renderIntoDocument(<Note {...defaultProps} />);
    return { component, actions: defaultProps.actions };
  };

  it('should have a title', () => {
    const { component } = setup();
    const root = findByTag(component, 'article');
    const title = ReactDOM.findDOMNode(findByTag(component, 'h1'));

    expect(root, 'component not rendered').to.exist;
    expect(title, 'no title found').to.exist;
    expect(root).to.have.property('className');
    expect(title.textContent).to.equals('Project bootstrap');
  });

  it('should toggle alert on click', () => {
    const { actions, component } = setup();
    const button = ReactDOM.findDOMNode(findByTag(component, 'button'));
    expect(button, 'no button found').to.exist;
    click(button);
    expect(actions.onChangeColorClick).to.have.been.calledOnce;
  });

  it('should change header color', () => {
    const { component: standard } = setup();
    const { component: toggled } = setup({ color: true });

    const standardTitle = ReactDOM.findDOMNode(findByTag(standard, 'h1')).className;
    const toggledTitle = ReactDOM.findDOMNode(findByTag(toggled, 'h1')).className;
    expect(standardTitle).not.to.equal(toggledTitle);
  });

});
