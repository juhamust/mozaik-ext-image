import React from 'react'
import Svg from '../src/components/Svg'

it('matches with snapshot', () => {
  const content = `
  <svg><test /></svg>
  `
  const wrapper = shallow(<Svg content={content} />)
  expect(wrapper).toMatchSnapshot()
})

it('requests api', () => {
  expect(
    Svg.getApiRequest({
      url: 'http://www.test.com/',
    })
  ).toEqual({
    id: 'image.download.a0c3027e579e1bc508c833a7dde37af49f6780ba1e17dc8d98d7ecbedeac6ba7',
    params: {
      url: 'http://www.test.com/',
    },
  })
})
