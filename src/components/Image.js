import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let intervalHandle;

const ImageWrapper = styled.div``;

const ImageCanvas = styled.div`
  width: 100%;
  height: 100%;
`;

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      prevUrl: null,
      counter: 0,
    }
  }

  componentWillUnmount() {
    if (intervalHandle) {
      clearInterval(intervalHandle);
    }
  }

  componentDidMount() {
    let counter = 0;
    //var url = urlib.parse(this.props.url, true);

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

    if (intervalHandle) {
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
  }

  afterImageLoad() {
    // No-op
  }

  render() {
    const url = urlib.format(this.state.url || this.props.url);
    const prevUrl = urlib.format(this.state.prevUrl || this.state.url || this.props.url);

    const prevStyle = {
      backgroundImage: `url(${prevUrl})`,
      backgroundSize: this.props.backgroundSize || 'cover',
      backgroundColor: this.props.backgroundColor,
    };
    const divStyle = {
      backgroundImage: `url(${url})`,
      backgroundSize: this.props.backgroundSize || 'cover',
      backgroundColor: this.props.backgroundColor,
      backgroundPosition: this.props.backgroundPosition || 'center center',
    };
    const wrapStyle = Object.assign({}, this.props.wrapStyle, {
      height: '100%',
    });
    const imgStyle = {
      display: 'none'
    };

    // If refreshing is in use, do double-buffering
    let imageArea = (<ImageCanvas style={divStyle} />);
    if (this.props.refreshInterval) {
      imageArea = (
        <ImageWrapper style={wrapStyle}>
          <img src={prevUrl} style={imgStyle} onLoad={this.afterImageLoad()} />
          <ImageCanvas style={prevStyle}>
            <ImageCanvas style={divStyle} />
          </ImageCanvas>
        </ImageWrapper>
      );
    }

    var header;
    if (this.props.title && this.props.title.length > 0) {
      header = (
        <div className="widget__header">
          {this.props.title}
          <i className="fa fa-picture-o" />
        </div>
      );
    }

    return (
      <div>
        {header}
        <div className="widget__body">
          {imageArea}
        </div>
      </div>
    );
  }

}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  refreshInterval: PropTypes.number,
  backgroundSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  wrapStyle: PropTypes.object,
}

Image.defaultProps = {
  refreshInterval: 5000,
}

export default Image