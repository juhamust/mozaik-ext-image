var React  = require('react');
var classSet = require('react-classset');


var Image = React.createClass({

  getInitialState() {
    return {
      counter: 0
    };
  },

  componentDidMount() {
    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, this.props.interval || 60000);
  },

  render() {
    var url = this.props.url;
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