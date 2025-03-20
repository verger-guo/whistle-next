require('../css/image-view.css');
var React = require('react');
var util = require('./util');

var isClient = util.getQuery().mode === 'client';
var hasWebView = function() {
  return isClient && window.WebView && window.WebView.name === 'WebViewElement';
};

class ImageView extends React.Component {
  shouldComponentUpdate(nextProps) {
    var hide = util.getBoolean(this.props.hide);
    return hide != util.getBoolean(nextProps.hide) || !hide;
  }

  preview = () => {
    util.openPreview(this.props.data);
  };

  getPreviewUrl = () => {
    var data = !this.props.imgSrc && hasWebView() && this.props.data;
    if (!data || !data.res.base64) {
      return;
    }
    if (this._curData !== data) {
      this._curData = data;
      this._previewUrl = util.getPreviewUrl(data);
    }
    return this._previewUrl;
  };

  getPreviewElem = (previewUrl) => {
    if (previewUrl) {
      return <webview src={previewUrl} className="fill" />;
    }
    var props = this.props;
    if (props.imgSrc) {
      return <img src={props.imgSrc} />;
    }
    if (props.data) {
      return <a className="w-image-link" onClick={this.preview}>Preview page in new window</a>;
    }
  };

  render() {
    var props = this.props;
    var previewUrl = this.getPreviewUrl(props.data);
    var isImg = props.imgSrc && !previewUrl;

    return (
      <div
        className={'fill w-image-view' + (previewUrl ? ' w-image-webview' : '') +
          (props.hide ? ' hide' : '') + (isImg ? ' w-image-bg' : '')}
      >
        {previewUrl || props.imgSrc ? <div className="w-textarea-bar">
          <a onClick={this.preview}>Open in new window</a>
        </div> : undefined}
        {this.getPreviewElem(previewUrl)}
      </div>
    );
  }
}

module.exports = ImageView;
