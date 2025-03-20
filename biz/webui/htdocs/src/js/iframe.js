require('../css/iframe.css');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class IFrame extends React.Component {
  getWindow = () => {
    return ReactDOM.findDOMNode(this.refs.iframe).contentWindow;
  };

  componentDidMount() {
    $(document).on('mousedown', '.w-iframe-mask', function() {
      $('.w-iframe-mask').hide();
    })
    .on('mouseenter', '.w-iframe[allow-dragover=1]', function() {
      $('.w-iframe-mask').hide().parent().removeAttr('allow-dragover');
    });
  }

  render() {
    var props = this.props;
    var className = props.className;
    return (
      <div className={'fill box w-iframe' + (className ? ' ' + className : '')} style={props.style}>
        <iframe ref="iframe" onLoad={props.onLoad} src={props.src} className="fill" />
        <div className="w-iframe-mask"></div>
      </div>
    );
  }
}

module.exports = IFrame;
