var url = require('url');
var React  = require('react');
var classSet = require('react-classset');


var Image = React.createClass({

  getInitialState() {
    return {
      url: this.props.url,
      counter: 0
    };
  },

  componentWillMount() {
    this.props
  },

  componentDidMount() {
    var counter;
    var purl = url.parse(this.props.url, true);
    purl.query = purl.query || {};
    purl.search = undefined;
    purl.query.counter = purl.query.counter || this.state.counter;

    setInterval(() => {
      counter= parseInt(this.state.counter, 10) + 1
      purl.query.counter = counter.toString();

      this.setState({
        counter: counter,
        url: url.format(purl)
      });
    }, this.props.interval || 60000);
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
          <div style={prevStyle}>
            <div className="image__background" style={divStyle}>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Image;