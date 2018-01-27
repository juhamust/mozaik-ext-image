import React, { Component } from 'react'
import PropTypes from 'prop-types'
import parseUrl from 'url-parse'
import styled from 'styled-components'
import FileImageO from 'react-icons/lib/fa/file-image-o'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

const ImageWrapper = styled.div`
  position: relative;
`

const ImageCanvas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition-property: opacity;
  transition-duration: 4s;
`

class Image extends Component {
  constructor(props) {
    super(props)
    this.intervalHandle
    this.state = {
      currentUrl: null,
      prevUrl: null,
      counter: 0,
    }
  }

  componentWillUnmount() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle)
    }
  }

  componentDidMount() {
    // In a case no interval defined, just set static URL
    const refreshInterval = parseInt(this.props.refreshInterval, 10)

    // No refresh
    if (!this.props.refreshInterval) {
      this.setState({
        currentUrl: this.props.url,
        prevUrl: this.props.url,
      })
      return
    }

    // Set new update interval while removing existing
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle)
    }

    this.intervalHandle = setInterval(() => {
      const nextCounterValue = this.state.counter + 1
      this.setState({
        counter: nextCounterValue,
        currentUrl: this.getUniqueImageUrl(this.props.url, nextCounterValue),
        prevUrl: this.getUniqueImageUrl(this.props.url, this.state.counter),
      })
    }, refreshInterval)
  }

  getUniqueImageUrl(imageUrl, counter = 0) {
    const newImageUrl = parseUrl(imageUrl, true)
    newImageUrl.query.counter = counter

    return newImageUrl.toString()
  }

  renderImage(imageUrl, style = {}) {
    const { backgroundColor, backgroundPosition, backgroundSize, opacity } = style
    const divStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize,
      backgroundColor,
      backgroundPosition,
      opacity: opacity !== undefined && opacity,
    }
    return <ImageCanvas style={divStyle} />
  }

  render() {
    const url = this.state.currentUrl || this.props.url
    const prevUrl = this.state.prevUrl || this.state.currentUrl || this.props.url
    const wrapStyle = Object.assign({}, this.props.wrapStyle, {
      height: '100%',
    })

    // If refreshing is in use, do double-buffering
    let imageArea = this.renderImage(url, this.props)
    if (this.props.refreshInterval) {
      const even = this.state.counter % 2 === 0
      const odd = !even
      imageArea = (
        <ImageWrapper style={wrapStyle}>
          <img src={url} style={{ display: 'none' }} onLoad={null} />
          {this.renderImage(
            even ? url : prevUrl,
            Object.assign({}, this.props, {
              opacity: even ? 1 : 0,
            })
          )}
          {this.renderImage(
            odd ? url : prevUrl,
            Object.assign({}, this.props, {
              opacity: odd ? 1 : 0,
            })
          )}
        </ImageWrapper>
      )
    }

    return (
      <Widget>
        {this.props.title && (
          <WidgetHeader title={this.props.title} subjectPlacement="append" icon={FileImageO} />
        )}
        <WidgetBody style={{ top: this.props.title === undefined && 0 }}>{imageArea}</WidgetBody>
      </Widget>
    )
  }
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  refreshInterval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundPosition: PropTypes.string,
  wrapStyle: PropTypes.object,
}

Image.defaultProps = {
  refreshInterval: 15000,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
}

export default Image
