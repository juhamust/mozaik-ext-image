var url = require('url');
var React  = require('react');
var classSet = require('react-classset');

var intervalHandle;

var Image = React.createClass({

  getInitialState() {
    return {
      url: this.props.url,
      counter: 0
    };
  },

  componentWillUnmount() {
    if (intervalHandle) {
      clearInterval(intervalHandle);
    }
  },

  componentDidMount() {
    var counter;
    var purl = url.parse(this.props.url, true);
    purl.query = purl.query || {};
    purl.search = undefined;
    purl.query.counter = purl.query.counter || this.state.counter;

    // In a case no interval defined, just set static URL
    if (!this.props.refreshInterval) {
      this.setState({
        url: this.props.url
      });
      return;
    }

    if(intervalHandle) {
      clearInterval(intervalHandle);
    }

    intervalHandle = setInterval(() => {
      counter= parseInt(this.state.counter, 10) + 1
      purl.query.counter = counter.toString();

      this.setState({
        counter: counter,
        url: url.format(purl)
      });
    }, this.props.refreshInterval || 60000);
  },

  render() {
    var url = this.state.url;
    var divStyle = {
      backgroundImage: 'url(' + url + ')',
      backgroundSize: this.props.backgroundSize || 'cover'
    };

    return (
      <div>
        <div className="widget__header">
          {this.props.title || this.props.url}
          <i className="fa fa-picture-o" />
        </div>
        <div className="widget__body">
          <div className="image__background" style={divStyle}></div>
        </div>
      </div>
    );
  }

});

module.exports = Image;