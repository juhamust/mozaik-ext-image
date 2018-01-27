import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FileImageO from 'react-icons/lib/fa/file-image-o'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'
import Vivus from 'vivus'

const ImageArea = styled.div``

class Svg extends Component {
  componentWillUnmount() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle)
    }
  }

  componentDidMount() {
    if (!this._e) {
      return
    }

    const { type, duration } = this.props
    const svgObject =
      this._e.getElementsByTagName('object')[0] || this._e.getElementsByTagName('svg')[0]
    const options = {
      type,
      duration,
    }
    new Vivus(svgObject, options, ref => {
      if (this.props.loop && ref.getStatus() === 'end') {
        ref.reset().play()
      }
    })
  }

  renderInline(content) {
    return {
      __html: content,
    }
  }

  render() {
    const { url } = this.props
    const imageArea = (
      <ImageArea innerRef={e => (this._e = e)}>
        {this.props.content ? (
          <div dangerouslySetInnerHTML={this.renderInline(this.props.content)} />
        ) : (
          <object type="image/svg+xml" data={url} />
        )}
      </ImageArea>
    )

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

Svg.propTypes = {
  url: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  loop: PropTypes.bool,
  duration: PropTypes.number,
  type: PropTypes.oneOf([
    'delayed',
    'sync',
    'oneByOne',
    'script',
    'script',
    'scenario',
    'scenario-sync',
  ]),
}

Svg.defaultProps = {
  loop: false,
  duration: 100,
  type: 'delayed',
}

export default Svg
