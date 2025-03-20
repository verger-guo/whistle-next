var React = require('react');
var Dialog = require('./dialog');
var Textarea = require('./textarea');

class TextDialog extends React.Component {
  state = {};

  show = (value, base64, name) => {
    if (value) {
      var self = this;
      self.setState({ value: value, base64: base64, name: name }, function () {
        self.refs.textDialog.show();
      });
    }
  };

  render() {
    var state = this.state;
    var value = state.value;
    return (
      <Dialog ref="textDialog" wstyle="w-text-dialog">
        <div className="modal-body">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <div
            className="orient-vertical-box"
            style={{ width: 860, height: 560, marginTop: 22 }}
          >
            <Textarea
              className="fill"
              value={value}
              base64={state.base64}
              defaultName={state.name}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary w-copy-text-with-tips"
            data-clipboard-text={value}
          >
            Copy
          </button>
          <button
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </Dialog>
    );
  }
}

class TextDialogWrap extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  show = (value, base64, name) => {
    this.refs.textDialog.show(value, base64, name);
  };

  render() {
    return <TextDialog ref="textDialog" />;
  }
}

module.exports = TextDialogWrap;
