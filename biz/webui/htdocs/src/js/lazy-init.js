var React = require('react');

class LazyInit extends React.Component {
  render() {
    if (!this.props.inited && !this._inited) {
      return null;
    }
    this._inited = true;
    return this.props.children;
  }
}

module.exports = LazyInit;
