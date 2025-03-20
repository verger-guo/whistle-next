var $ = (window.jQuery = require('jquery'));
var React = require('react');
var ReactDOM = require('react-dom');

class Dialog extends React.Component {
  state = {};

  componentDidMount() {
    var self = this;
    this.container = $(document.createElement('div'));
    var clazz = this.props.fullCustom ? ' w-custom-dialog' : '';
    this.container.addClass(
      'modal fade' + clazz + (this.props.wstyle ? ' ' + this.props.wstyle : '')
    );
    document.body.appendChild(this.container[0]);
    this.componentDidUpdate();
    if (typeof this.props.customRef === 'function') {
      this.props.customRef(this);
    }
    if (typeof this.props.onClose === 'function') {
      this.container.on('hidden.bs.modal', this.props.onClose);
    }
    if (typeof self.props.onShow === 'function') {
      this.container.on('shown.bs.modal', function() {
        self.props.onShow(self);
      });
    }
  }

  componentDidUpdate() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.getDialogElement(),
      this.container[0]
    );
  }

  getDialogElement = () => {
    var props = this.props;
    var className = props.wclassName;
    var style;
    if (props.width) {
      style = style || {};
      style.width = props.width;
    }
    if (props.fullCustom && props.height) {
      style = style || {};
      style.height = props.height;
    }
    return (
      <div
        style={style}
        className={'modal-dialog' + (className ? ' ' + className : '')}
      >
        <div className="modal-content">{this.props.children}</div>
      </div>
    );
  };

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.container[0]);
    document.body.removeChild(this.container[0]);
  }

  show = () => {
    if (this.isVisible()) {
      return;
    }
    this.container.modal(
      this.props.disableBackdrop
        ? {
          show: true,
          backdrop: false
        }
        : 'show'
    );
  };

  isVisible = () => {
    return this.container.is(':visible');
  };

  hide = () => {
    this.container.modal('hide');
  };

  destroy = () => {
    this.hide();
    this.container && this.componentWillUnmount();
  };

  render() {
    return null;
  }
}

module.exports = Dialog;
