import React, { Component } from 'react'
import PropTypes from 'prop-types'
import parseUrl from 'url-parse'
import styled from 'styled-components'
import FileImageO from 'react-icons/lib/fa/file-image-o'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

let intervalHandle

const ImageWrapper = styled.div``

const ImageCanvas = styled.div`
    width: 100%;
    height: 100%;
`

class Image extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUrl: null,
            prevUrl: null,
            counter: 0,
        }
    }

    componentWillUnmount() {
        if (intervalHandle) {
            clearInterval(intervalHandle)
        }
    }

    componentDidMount() {
        let counter = 0
        const parsedUrl = parseUrl(this.props.url)

        parsedUrl.query = parsedUrl.query || {}
        parsedUrl.search = undefined
        parsedUrl.query.counter = parsedUrl.query.counter || this.state.counter

        // In a case no interval defined, just set static URL
        const refreshInterval = parseInt(this.props.refreshInterval, 10)

        // No refresh
        if (!this.props.refreshInterval) {
            this.setState({
                currentUrl: parsedUrl.toString(),
                prevUrl: parsedUrl.toString(),
            })
            return
        }

        // Set new update interval while removing existing
        if (intervalHandle) {
            clearInterval(intervalHandle)
        }

        intervalHandle = setInterval(() => {
            const parsedUrlNew = parseUrl(this.props.url, true)
            counter = parseInt(this.state.counter, 10) + 1
            parsedUrlNew.query.counter = counter
            this.setState({
                counter: counter,
                currentUrl: parsedUrlNew.toString(),
            })
        }, refreshInterval)
    }

    afterImageLoad() {
        // No-op
    }

    render() {
        const { backgroundColor, backgroundPosition, backgroundSize } = this.props
        const url = this.state.currentUrl || this.props.url
        const prevUrl = this.state.prevUrl || this.state.currentUrl || this.props.url

        const prevStyle = {
            backgroundImage: `url(${prevUrl})`,
            backgroundSize,
            backgroundColor,
        }
        const divStyle = {
            backgroundImage: `url(${url})`,
            backgroundSize,
            backgroundColor,
            backgroundPosition,
        }
        const wrapStyle = Object.assign({}, this.props.wrapStyle, {
            height: '100%',
        })
        const imgStyle = {
            display: 'none',
        }

        // If refreshing is in use, do double-buffering
        let imageArea = <ImageCanvas style={divStyle} />
        if (this.props.refreshInterval) {
            imageArea = (
                <ImageWrapper style={wrapStyle}>
                    <img src={prevUrl} style={imgStyle} onLoad={this.afterImageLoad()} />
                    <ImageCanvas style={prevStyle}>
                        <ImageCanvas style={divStyle} />
                    </ImageCanvas>
                </ImageWrapper>
            )
        }

        return (
            <Widget>
                {this.props.title && (
                    <WidgetHeader
                        title={this.props.title}
                        subject="Status"
                        subjectPlacement="append"
                        icon={FileImageO}
                    />
                )}
                <WidgetBody>{imageArea}</WidgetBody>
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
    refreshInterval: 5000,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
}

export default Image
