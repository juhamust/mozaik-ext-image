import React, { Component } from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import styled from 'styled-components'

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
        const url = querystring.parse(this.props.url)

        url.query = url.query || {}
        url.search = undefined
        url.query.counter = url.query.counter || this.state.counter

        // In a case no interval defined, just set static URL
        if (!this.props.refreshInterval) {
            this.setState({
                currentUrl: url,
                prevUrl: url,
            })
            return
        }

        if (intervalHandle) {
            clearInterval(intervalHandle)
        }

        const refreshInterval = parseInt(this.props.refreshInterval, 10)

        intervalHandle = setInterval(() => {
            var prevUrl = Object.assign({}, url)
            counter = parseInt(this.state.counter, 10) + 1
            url.query.counter = counter.toString()
            //console.log('prev', prevUrl.query.counter, ' - url', url.query.counter);

            this.setState({
                counter: counter,
                prevUrl: prevUrl,
                currentUrl: url,
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

        let header
        if (this.props.title && this.props.title.length > 0) {
            header = (
                <div className="widget__header">
                    {this.props.title}
                    <i className="fa fa-picture-o" />
                </div>
            )
        }

        return (
            <div>
                {header}
                <div className="widget__body">{imageArea}</div>
            </div>
        )
    }
}

Image.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    refreshInterval: PropTypes.string,
    backgroundSize: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundPosition: PropTypes.string,
    wrapStyle: PropTypes.object,
}

Image.defaultProps = {
    refreshInterval: '5000',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
}

export default Image
