# Mozaïk image extension

Show image in a widget. Supports also refreshing the image in timely bases, making it handy for webcams, daily comics or kittens 😊

![preview](https://raw.githubusercontent.com/juhamust/mozaik-ext-image/master/preview.png)

**Table of contents**
<!-- MarkdownTOC depth=0 autolink=true bracket=round -->

- [Setup](#setup)
- [Widget: image.image](#widget-imageimage)
  - [parameters](#parameters)
  - [usage](#usage)
- [License](#license)

<!-- /MarkdownTOC -->

## Setup

- Install extension: `npm i -S mozaik-ext-image`
- Register widget: `mozaik.addBatch('image', require('mozaik-ext-image'));`
- Add widget(s) in dashboard `config.js` (see Widget X specific documentation)

## Widget: image.image

Show the image in widget.

### parameters

key                   | required | description
----------------------|----------|---------------
`url`                 | yes      | *URL to an image.*
`title`               | no       | *Title to show in widget. Defaults to no header*
`refreshInterval`     | no       | *Image refreshing interval in milliseconds (refreshing is done automatically by adding/incrementing counter attribute). Defaults to no refresh. Example: 3000*
`backgroundSize`      | no       | *Image size (set as background image). Defaults to 'cover'*
`backgroundColor`     | no       | *Background color, handy with transparent images. Defaults to parent color*
`backgroundPosition`  | no       | *Background position, defaults to 'center center'*

### usage

- Register the widget
- Add widget in dashboard configuration:

  ```yml
  widgets:
    -
      extension:          image
      widget:             Image
      url:                https://picsum.photos/200/300/?random
      refreshInterval:    10000
      backgroundSize:     cover
      backgroundPosition: center -7vh
      title:              Random image
      columns:            1
      rows:               1
      x:                  0
      y:                  0
  ```

## Changelog

#### 2.0.0-dev

- Support for Mozaik 2.x
- Changed refreshInterval from seconds to milliseconds
- Changed title default value to no header

#### 0.1.0

- TBD

## License

Distributed under the MIT license
