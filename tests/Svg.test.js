import React from 'react'
import Svg from '../src/components/Svg'

it('matches with snapshot', () => {
  const content = `
  <svg><test /></svg>
  `
  const wrapper = shallow(<Svg content={content} />)
  expect(wrapper).toMatchSnapshot()
})
