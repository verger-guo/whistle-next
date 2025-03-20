require('../css/account.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('./dialog');
var events = require('./events');

class AccountDialog extends React.Component {
  show = (url) => {
    if (url) {
      ReactDOM.findDOMNode(this.refs.iframe).src = url;
    }
    this.refs.dialog.show();
  };

  hide = () => {
    this.refs.dialog.hide();
  };

  shouldComponentUpdate() {
    return false;
  }

  openInNewWin = () => {
    events.trigger('openInNewWin');
  };

  render() {
    var className = this.props.className;
    return (
      <Dialog ref="dialog" wstyle={'w-account-dialog' + (className ? ' ' + className : '')}>
        <a className="w-open-win-btn" onClick={this.openInNewWin}>Open In New Window</a>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >&times;</button>
        <iframe ref="iframe" className="modal-body" />
      </Dialog>
    );
  }
}

module.exports = AccountDialog;
