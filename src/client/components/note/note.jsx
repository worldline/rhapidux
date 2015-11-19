import React, { Component, PropTypes } from 'react';
import style from './note.css';

export default class Note extends Component {

  static displayName = 'Note';

  static propTypes = {
    actions: PropTypes.object.isRequired,
    color: PropTypes.bool
  };

  render() {
    const color = 'color' in this.props ?
      (this.props.color ? 'alert' : '') :
      '';

    const { actions } = this.props;

    return (
      <article className={style.article}>
        <h1 className={style[`header-${color}`] || style.header}>Project bootstrap</h1>
        <div className={style.textBlock}>
          <p>React + Webpack + Hot reloading + PostCSS</p>
          <p>And it works</p>
          <button className={style.button} onClick={actions.onChangeColorClick}>Click me !</button>
        </div>
      </article>
    );
  }
}
