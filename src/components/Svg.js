import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shajs from 'sha.js'
import styled from 'styled-components'
import FileImageO from 'react-icons/lib/fa/file-image-o'
import { Widget, WidgetHeader, WidgetBody, WidgetLoader, TrapApiError } from '@mozaik/ui'
import Vivus from 'vivus'

const ImageArea = styled.div`
  text-align: center;
  svg,
  object {
    margin: auto;
  }
`
const replaceRules = [
  { match: /fill-rule/gm, replace: 'fillRule' },
  { match: /stroke-width/gm, replace: 'strokeWidth' },
]

class Svg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedContent: null,
    }
  }

  static getApiRequest({ url }) {
    // Construct unique id based on URL
    const id = `image.download.${shajs('sha256')
      .update(url)
      .digest('hex')}`
    return {
      id,
      params: { url },
    }
  }

  componentWillUnmount() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle)
    }
  }

  componentDidMount() {
    const { animation, speed } = this.props
    if (!this._e || !animation) {
      return
    }

    const svgObject = this._e.getElementsByTagName('svg')[0]
    // Animate
    if (svgObject && animation && animation !== '') {
      const options = {
        type: animation,
        duration: speed,
      }
      new Vivus(svgObject, options, ref => {
        if (this.props.loop && ref.getStatus() === 'end') {
          ref.reset().play()
        }
      })
    }
  }

  reactifyAttributes(content) {
    let contentCopy = content
    replaceRules.forEach(rule => {
      contentCopy = contentCopy.replace(rule.match, rule.replace)
    })
    return contentCopy
  }

  renderInline(content) {
    return {
      __html: this.reactifyAttributes(content),
    }
  }

  render() {
    const { apiError } = this.props
    const content = this.props.content || (this.props.apiData && this.props.apiData.content)
    const body = content ? (
      <ImageArea innerRef={e => (this._e = e)}>
        <div dangerouslySetInnerHTML={this.renderInline(content)} />
      </ImageArea>
    ) : (
      <WidgetLoader />
    )

    return (
      <Widget>
        {this.props.title && (
          <WidgetHeader title={this.props.title} subjectPlacement="append" icon={FileImageO} />
        )}
        <WidgetBody style={{ top: this.props.title === undefined && 0 }}>
          <TrapApiError error={apiError}>{body}</TrapApiError>
        </WidgetBody>
      </Widget>
    )
  }
}

Svg.propTypes = {
  url: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  loop: PropTypes.bool,
  speed: PropTypes.number,
  apiError: PropTypes.object,
  animation: PropTypes.oneOf([
    'delayed',
    'sync',
    'oneByOne',
    'script',
    'script',
    'scenario',
    'scenario-sync',
  ]),
  apiData: PropTypes.shape({
    content: PropTypes.string,
  }),
}

Svg.defaultProps = {
  animate: false,
  loop: false,
  speed: 100,
}

export default Svg
