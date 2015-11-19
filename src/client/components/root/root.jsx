import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { ReduxRouter } from 'redux-router';
import { Route, IndexRoute } from 'react-router';
import { Provider, connect } from 'react-redux';
import store from '../../store';
import * as actions from '../../actions';

import '../../styles/app.css';

import Main from '../main/main.jsx';

const mapStateToProps = (state) => ({
  router: state.router,
  color: state.color
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Rhapidux</h1>
        {this.props.children}
      </div>
    );
  }

}

export default class Root extends Component {
  render() {
    let devtools;

    if (__DEV__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      devtools = (
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      );
    }

    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            <Route path='/' component={App}>
              <IndexRoute component={Main}/>
            </Route>
          </ReduxRouter>
        </Provider>
        {devtools}
      </div>
    );
  }
}
