import React from 'react'
import Image from '../src/components/Image'

test('renders', () => {
    const wrapper = mount(<Image url="http://domain.com/image.png" />)
    expect(wrapper).toMatchSnapshot()
})
