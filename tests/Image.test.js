import React from 'react'
import Image from '../src/components/Image'

test('matches with snapshot', () => {
    const wrapper = shallow(<Image url="http://domain.com/image.png" />)
    expect(wrapper).toMatchSnapshot()
})

test('has optional title', () => {
    const wrapper = shallow(<Image title="My title" url="http://domain.com/image.png" />)
    expect(wrapper).toMatchSnapshot()
})
