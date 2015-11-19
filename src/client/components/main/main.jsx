import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Note from '../note/note.jsx';

const mapStateToProps = (state) => ({
  router: state.router,
  color: state.color
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    color: PropTypes.bool
  };

  render() {
    return (
      <Note color={this.props.color} actions={this.props.actions} />
    );
  }

}
