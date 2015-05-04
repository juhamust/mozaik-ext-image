/* jshint esnext: true */
var _ = require('lodash');
var urlib = require('url');
var React  = require('react');
var classSet = require('react-classset');

var intervalHandle;

var Image = React.createClass({

  getInitialState() {
    return {
      url: null,
      prevUrl: null,
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
    var url = urlib.parse(this.props.url, true);


    url.query = url.query || {};
    url.search = undefined;
    url.query.counter = url.query.counter || this.state.counter;

    // In a case no interval defined, just set static URL
    if (!this.props.refreshInterval) {
      this.setState({
        url: url,
        prevUrl: url
      });
      return;
    }

    if(intervalHandle) {
      clearInterval(intervalHandle);
    }

    this.props.refreshInterval = parseInt(this.props.refreshInterval, 10);

    intervalHandle = setInterval(() => {
      var prevUrl = _.cloneDeep(url);
      counter = parseInt(this.state.counter, 10) + 1;
      url.query.counter = counter.toString();
      //console.log('prev', prevUrl.query.counter, ' - url', url.query.counter);

      this.setState({
        counter: counter,
        prevUrl: prevUrl,
        url: url
      });
    }, (this.props.refreshInterval * 1000));
  },

  afterImageLoad() {
    // No-op
  },

  render() {
    var url = urlib.format(this.state.url);
    var prevUrl = urlib.format(this.state.prevUrl);

    var prevStyle = {
      backgroundImage: 'url(' + prevUrl + ')',
      backgroundSize: this.props.backgroundSize || 'cover',
      backgroundColor: this.props.backgroundColor
    };
    var divStyle = {
      backgroundImage: 'url(' + url + ')',
      backgroundSize: this.props.backgroundSize || 'cover',
      backgroundColor: this.props.backgroundColor
    };
    var wrapStyle = _.defaults((this.props.wrapStyle || {}), {
      height: '100%'
    });
    var imgStyle = {
      display: 'none'
    };

    // If refreshing is in use, do double-buffering
    var imageArea = (<div className="image__background" style={divStyle}></div>);
    if (this.props.refreshInterval) {
      imageArea = (<div style={wrapStyle}>
        <img src={prevUrl} style={imgStyle} onload={this.afterImageLoad()} />
        <div className="image__background" style={prevStyle}>
          <div className="image__background" style={divStyle}></div>
        </div>
      </div>);
    }

    return (
      <div>
        <div className="widget__header">
          {this.props.title || this.props.url}
          <i className="fa fa-picture-o" />
        </div>
        <div className="widget__body">
          {imageArea}
        </div>
      </div>
    );
  }

});

module.exports = Image;