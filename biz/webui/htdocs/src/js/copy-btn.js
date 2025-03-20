var React = require('react');

class CopyBtn extends React.Component {
  state = {};

  handleLeave = () => {
    this.setState({ copied: false });
  };

  handleCopy = () => {
    this.setState({ copied: true });
  };

  render() {
    var copied = this.state.copied;
    return (
      <a
        onMouseLeave={this.handleLeave}
        onClick={this.handleCopy}
        style={copied ? { color: '#ccc', cursor: 'not-allowed' } : undefined}
        className={'w-copy-btn' + (copied ? '' : ' w-copy-text')}
        draggable="false"
        data-clipboard-text={this.props.value || ''}
      >
        {(copied ? 'Copied' : 'Copy') + (this.props.name || '')}
      </a>
    );
  }
}

module.exports = CopyBtn;
