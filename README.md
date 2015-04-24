# Mozaïk image extension

Show image in a widget. Supports also refreshing the image in timely bases, making it handy for webcams, daily comics or kittens :)

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
- Add widget(s) in dashboard `config.js` (see Widget parameters)

## Widget: image.image

Show the image in widget.

### parameters

key                | required | description
-------------------|----------|---------------
`url`              | yes      | *URL to an image. Refreshing is done automatically by adding/incrementing counter attribute*
`title`            | no       | *Title to show in widget. Defaults to URL*
`refreshInterval`  | no       | *Image refreshing interval in seconds. Defaults to no refresh. Example: 30*

### usage

```javascript
{
  type: 'image.image',
  title: 'My webcam',
  url: 'http://domain.com/webcam.jpg',
  // Refresh every 30s
  refreshInterval: 30,
  columns: 1, rows: 1,
  x: 0, y: 0
}
```

## License

Distributed under the MIT license
