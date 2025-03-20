var React = require('react');
var util = require('./util');
var dataCenter = require('./data-center');
var events = require('./events');
var getBridge = require('./bridge');
var IFrame = require('./iframe');

var modal = dataCenter.networkModal;

function onWhistleInspectorCustomTabReady(init, win) {
  if (typeof init === 'function') {
    init(getBridge(win));
  }
}

class TabFrame extends React.Component {
  constructor(props) {
    super(props);
    var url = props.src;
    url += url.indexOf('?') === -1 ? '?' : '&';

    this.state = {
      url:
        url + '???_WHISTLE_PLUGIN_INSPECTOR_TAB_' + dataCenter.getPort() + '???'
    };
  }

  componentDidMount() {
    events.on('selectedSessionChange', this.handlePush);
  }

  componentWillUnmount() {
    events.off('selectedSessionChange', this.handlePush);
  }

  shouldComponentUpdate(nextProps) {
    var hide = util.getBoolean(this.props.hide);
    return hide != util.getBoolean(nextProps.hide) || !hide;
  }

  compose = (item) => {
    this.handlePush(null, null, item);
  };

  handlePush = (_, item, comItem) => {
    try {
      var win = this.refs.iframe.getWindow();
      if (
        win &&
        typeof win.__pushWhistle5b6af7b9884e1165SessionActive__ === 'function'
      ) {
        if (comItem) {
          win.__pushWhistle5b6af7b9884e1165SessionActive__(null, null, comItem);
          comItem = null;
        } else if (this.props.hide) {
          win.__pushWhistle5b6af7b9884e1165SessionActive__(null, true);
        } else {
          win.__pushWhistle5b6af7b9884e1165SessionActive__(
            item || modal.getActive()
          );
        }
      }
    } catch (e) {}
    this.composeItem = comItem;
  };

  componentDidUpdate() {
    this.handlePush();
  }

  onLoad = () => {
    if (this.composeItem) {
      this.handlePush(null, null, this.composeItem);
      this.composeItem = null;
    }
  };

  render() {
    var display = this.props.hide ? 'none' : undefined;
    // 防止被改
    window.onWhistleInspectorCustomTabReady = onWhistleInspectorCustomTabReady;
    return (
      <IFrame
        onLoad={this.onLoad}
        ref="iframe"
        src={this.state.url}
        style={{ display: display }}
      />
    );
  }
}

module.exports = TabFrame;
