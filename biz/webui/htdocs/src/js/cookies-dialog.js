require('./base-css.js');
require('../css/composer.css');
var React = require('react');
var Dialog = require('./dialog');

class CookiesDialog extends React.Component {
  state = { cookies: [] };

  show = (cookies) => {
    this.refs.cookiesDialog.show();
    this._hideDialog = false;
    this.setState({ cookies: cookies || [] });
  };

  hide = () => {
    this.refs.cookiesDialog.hide();
    this._hideDialog = true;
  };

  shouldComponentUpdate() {
    return this._hideDialog === false;
  }

  insert = (e) => {
    var i = e.target.getAttribute('data-index');
    var cookie = this.state.cookies[i];
    cookie && this.props.onInsert(cookie, true);
    this.hide();
  };

  render() {
    var self = this;
    var cookies = self.state.cookies;
    return (
      <Dialog ref="cookiesDialog" wstyle="w-composer-cookies-dialog">
        <div className="modal-body">
          <button type="button" className="close" onClick={self.hide}>
            <span aria-hidden="true">&times;</span>
          </button>
          <table className="table">
            <thead>
              <th className="w-composer-cookie-order">#</th>
              <th className="w-composer-cookie-value">Cookie</th>
              <th className="w-composer-cookie-operation">Operation</th>
            </thead>
            <tbody>
              {cookies.map(function (cookie, i) {
                return (
                  <tr>
                    <th className="w-composer-cookie-order">{i + 1}</th>
                    <td className="w-composer-cookie-value">
                      {cookie}
                    </td>
                    <td className="w-composer-cookie-operation">
                      <a
                        className="w-copy-text-with-tips"
                        data-clipboard-text={cookie}
                      >
                        Copy
                      </a>
                      <a
                        data-index={i}
                        onClick={self.insert}
                      >
                        Insert
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-default"
            onClick={self.hide}
          >
            Close
          </button>
        </div>
      </Dialog>
    );
  }
}

module.exports = CookiesDialog;
