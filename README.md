# google-maps-addon

[![Build Status](https://travis-ci.org/SamvelRaja/google-maps-addon.svg?branch=master)](https://travis-ci.org/SamvelRaja/google-maps-addon) [![Dependency Status][david-image]][david-url] [![NPM Version][npm-image]][npm-url] [![Ember Observer Score](http://emberobserver.com/badges/google-maps-addon.svg)](http://emberobserver.com/addons/google-maps-addon)

[DEMO](http://samvelraja.github.io/#/demos/googlemaps)

# An Ember Addon

Google maps [ember addon](http://www.emberaddons.com/) easy to consume.

## Installation

* `ember install:addon google-maps-addon`

## Running Tests

* `ember test`
* `ember test --server`

## Usage

```hbs
{{google-maps-addon
  mapOptions=mapOptions
  markers=markers
  circles=circles
  rectangles=rectangles
  infoWindows=infoWindows}}
```

### Map Options

The **JSON** **mapOptions** object is used to configure the base settings for the map.

All configuration options in some way relate to the official attributes for [Google Maps Options objects](https://developers.google.com/maps/documentation/javascript/reference).

```js
mapOptions: {
  latitude: 'Your latitude',
  longitude: 'Your longitude',
  zoom: 'Your prefered zooming level',
  // Mouse events
  click(event) {
    // I promise a callback is assured for the particular event so have your code here
    // See the "Supported Mouse Events"-section for all events you can add
  }
}
```

### Markers

The `markers` array contains an array of objects with configuration options that map to the [MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions). All map one-to-one to their real options, except the `position`. You pass in a `latitude` and a `longitude`-property instead of a `google.maps.LatLng` as `position`.

The `key` attribute is custom to `google-maps-addon` and is used to intelligently diff objects when the markers array changes. All changes applied are all differential. You can update them as much as you can and expect reasonable performance.

```js
markers: [
  {
    key: 'A unique value that identifies this marker as an entity',
    latitude: 'Your marker latitude if empty will takes up the center latitude',
    longitude: 'Your marker longitude if empty will takes up the center longitude',
    title: 'Your title, if not provided it takes up as empty string',
    animation: 'DROP' || 'BOUNCE',
    timeout: timeout after the window loads,
    icon: 'Specify the path of the icon',
    draggable: true,
    // Mouse events
    click(event) {
      // I promise a callback is assured for the particular event so have your code here
      // See the "Supported Mouse Events"-section for all events you can add
    }
  },
  {
    key: 'A unique value that identifies this marker as an entity',
    latitude: 'Your marker latitude if empty will takes up the center latitude',
    longitude: 'Your marker longitude if empty will takes up the center longitude',
    title: 'Your title, if not provided it takes up as empty string',
    animation: 'DROP' || 'BOUNCE',
    timeout: timeout after the window loads,
    icon: 'Specify the path of the icon',
    draggable: true,
    // Mouse events
    click(event) {
      // I promise a callback is assured for the particular event so have your code here
      // See the "Supported Mouse Events"-section for all events you can add
    }
  }
]
```

### Circles

The `circles` array contains an array of objects with configuration options that map to the [CircleOptions](https://developers.google.com/maps/documentation/javascript/reference#CircleOptions). All map one-to-one to their real options, except the `position`. You pass in a `latitude` and a `longitude`-property instead of a `google.maps.LatLng` as `position`.

The `key` attribute is custom to `google-maps-addon` and is used to intelligently diff objects when the `circles` array changes. All changes applied are all differential. You can update them as much as you can and expect reasonable performance.

```js
circles: [{
  key: 'A unique value that identifies this marker as an entity',
  radius: 100, // Radius of the circle,
  latitude: number, // latitude of the center,
  longitude: number, // longitude of the center,
  fillColor: color, // fill color
  strokeColor: color, // stroke color
  // Mouse events
  click(event) {
    // I promise a callback is assured for the particular event so have your code here
    // See the "Supported Mouse Events"-section for all events you can add
  }
  // More options at https://developers.google.com/maps/documentation/javascript/reference#CircleOptions
}]
```

### Rectangles

The `rectangles` array contains an array of objects with configuration options that map to the [RectangleOptions](https://developers.google.com/maps/documentation/javascript/reference#RectangleOptions). All map one-to-one to their real options. (Even the `bounds`-object)

The `key` attribute is custom to `google-maps-addon` and is used to intelligently diff objects when the `rectangles` array changes. All changes applied are all differential. You can update them as much as you can and expect reasonable performance.

```js
rectangles: [{
  bounds: {
    northEast: number,
    southWest: number
  },
  fillColor: color,
  fillOpacity: float,
  click(event) {
    // I promise a callback is assured for the particular event so have your code here
    // See the "Supported Mouse Events"-section for all events you can add
  }
  // More options at https://developers.google.com/maps/documentation/javascript/reference#RectangleOptions
}]
```


### Info Windows

The `infoWindows` array contains an array of objects with configuration options that map to the [InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference#InfoWindowOptions). All map one-to-one to their real options, except the `position`. You pass in a `latitude` and a `longitude`-property instead of a `google.maps.LatLng` as `position`.

The `key` attribute is custom to `google-maps-addon` and is used to intelligently diff objects when the `infoWindow` array changes. All changes applied are all differential. You can update them as much as you can and expect reasonable performance.

```js
infoWindows: [{
  key: 'my-window',
  content: 'Your HTML content here',
  latitude: 'Your info window latitude if empty will takes up the center latitude',
  longitude: 'Your info window longitude if empty will takes up the center longitude',
  maxWidth: 'The maximum width of the info window' //in number
  pixelOffset: 'The offset, in pixels, of the tip of the info window from the point on the map at whose geographical coordinates the info window is anchored. If an InfoWindow is opened with an anchor, the pixelOffset will be calculated from the anchors anchorPoint property.'
  // More options at https://developers.google.com/maps/documentation/javascript/reference#InfoWindowOptions
}]
```

### Supported Mouse events

```js
'click',
'dblclick',
'drag',
'dragend',
'dragstart',
'mousemove',
'mouseout',
'mouseover',
'rightclick'
```

## Demo

[Here is a small demo.](http://samvelraja.github.io/#/demos/googlemaps)

## Issue and Feature request

Feel free to raise an issue or feature request.

## Contributing

1. [Fork it](https://github.com/SamvelRaja/google-maps-addon/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Next Planned update,

More info window support (events, adding it to markers)

Need more interactions back into the component than getting out of component

# License

google-maps-addon is [MIT Licensed](https://github.com/SamvelRaja/google-maps-addon/blob/master/LICENSE.md).

[npm-url]: https://www.npmjs.com/package/google-maps-addon
[npm-image]: https://img.shields.io/npm/v/google-maps-addon.svg
[david-url]: https://david-dm.org/samvelraja/google-maps-addon#info=dependencies
[david-image]: https://david-dm.org/samvelraja/google-maps-addon.svg
