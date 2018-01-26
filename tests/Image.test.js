import React from 'react'
import Image from '../src/components/Image'

it('matches with snapshot', () => {
    const wrapper = shallow(<Image url="http://domain.com/image.png" />)
    expect(wrapper).toMatchSnapshot()
})

it('has optional title', () => {
    const wrapper = shallow(<Image title="My title" url="http://domain.com/image.png" />)
    expect(wrapper).toMatchSnapshot()
})

it('updates image', () => {
    return new Promise((resolve, reject) => {
        const wrapper = shallow(
            <Image
                refreshInterval={100}
                title="My title"
                url="http://domain.com/image.png?foo=bar"
            />
        )

        const validate = () => {
            try {
                expect(wrapper.find('img').prop('src')).toEqual(
                    'http://domain.com/image.png?foo=bar&counter=2'
                )
            } catch (error) {
                reject(error)
            }
        }

        setTimeout(() => {
            wrapper.update()
            validate()
            resolve()
        }, 300)
    })
})
