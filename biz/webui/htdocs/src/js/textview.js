var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./util');

class TextView extends React.Component {
  componentDidMount() {
    this.updateValue();
  }

  componentDidUpdate() {
    this.updateValue();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.props.value = nextProps.value;
      this.updateValue();
    }
    return this.props.className !== nextProps.className;
  }

  updateValue = () => {
    var self = this;
    var value = self.props.value || '';
    var textarea = ReactDOM.findDOMNode(self.refs.textarea);
    if (self.props.hide) {
      textarea.value = '';
      self.curValue = '';
      clearTimeout(self._timeout);
      return;
    }
    if (value === self.curValue) {
      return;
    }
    clearTimeout(self._timeout);
    if (textarea.value === value) {
      return;
    }
    if (value.length < 10240) {
      textarea.value = value;
      self.curValue = value;
      return;
    }
    self.curValue = value;
    self._timeout = setTimeout(function () {
      textarea.value = value;
    }, 360);
  };

  render() {
    return (
      <textarea
        ref="textarea"
        onKeyDown={util.preventDefault}
        readOnly="readonly"
        className={this.props.className || ''}
      />
    );
  }
}

module.exports = TextView;
