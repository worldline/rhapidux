import React, { Component, PropTypes } from 'react';

class Html extends Component {

  static propTypes = {
    remount: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  };

  render() {
    /* eslint-disable react/no-danger */
    return (
      <html>
      <head>
        <meta charSet='utf-8'/>
      </head>
      <body>
      <div id='content' dangerouslySetInnerHTML={{ __html: this.props.remount }}></div>
      <script id='app-state' dangerouslySetInnerHTML={{ __html: this.props.state }}>
      </script>
      <script src='bundle.js'></script>
      </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}

export default Html;
