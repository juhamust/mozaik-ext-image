# Mozaïk image extension

Show image in a widget. Supports also refreshing the image in timely bases, making it handy for webcams, daily comics or kittens 😊

📢  &nbsp; **NOTE** [See mozaik-2 branch](https://github.com/juhamust/mozaik-ext-image/tree/mozaik-2) for Mozaik 2 compatible extension

![preview](https://raw.githubusercontent.com/juhamust/mozaik-ext-image/mozaik-2/preview.png)

**Table of contents**

- [Mozaïk image extension](#moza%C3%AFk-image-extension)
  - [Setup](#setup)
  - [Widget: image.Image](#widget-imageimage)
    - [parameters](#parameters)
    - [usage](#usage)
  - [Widget: image.Svg](#widget-imagesvg)
    - [parameters](#parameters)
    - [usage](#usage)
  - [Changelog](#changelog)
      - [2.0.0-dev](#200-dev)
      - [0.4.0](#040)
      - [0.2.2](#022)
      - [0.2.1](#021)
      - [0.2.0](#020)
      - [0.1.0](#010)
  - [License](#license)


## Setup

- Install extension: `npm i -S mozaik-ext-image`
- Register widget:
  ```js
  // register_extensions.js
  import image from 'mozaik-ext-image'
  Registry.addExtensions({ image, ... })
  ```
- Add widget(s) in dashboard `config.yml` (see Widget X specific documentation)

## Widget: image.Image

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


## Widget: image.Svg

Show (and optionally animate the path drawing) the SVG image in a widget.

### parameters

key                   | required      | description
----------------------|---------------|---------------
`url`                 | depends           | *URL to an image. Either this or content needs to be defined. NOTE: Because of the browser CORS rules, an extension client is needed to download the file in temp folder. This is done automatically once registered*
`content`             | depends        | *SVG image contents. Either this or url needs to be defined. Remember to use > to note multiline text*
`title`               | no            | *Title to show in widget. Defaults to no header*
`animation`             | no        | *Animation style if wanted to be used. Options: delayed, sync, oneByOne, script, scenario or scenario-sync. Defaults to empty which mean no animation. [See vivus documentation](https://github.com/maxwellito/vivus#option-list) for more info*
`duration`             | no        | *Animation duration in frames. Defaults to 200*



### usage

- Register the widget
- Add widget in dashboard configuration:

  ```yml
  widgets:
    -
      extension:          image
      widget:             Svg
      content: >
        <svg>
          <path ...>
          <path data-ignore="true" ...>
        </svg>
      title:              Random image
      animation:          oneByOne
      speed:              100
      columns:            1
      rows:               1
      x:                  0
      y:                  0
  ```

## Changelog

#### 2.0.0-dev

- Added for Mozaik 2.x
- Added new widget: `image.Svg`
- Changed refreshInterval unit from seconds to milliseconds
- Changed title default value to no header

#### 0.4.0

- Added support for background styles

#### 0.2.2

- Updated package links

#### 0.2.1

- Improved documentation

#### 0.2.0

- Added double buffering when refreshing image

#### 0.1.0

- First public release

## License

Distributed under the MIT license
