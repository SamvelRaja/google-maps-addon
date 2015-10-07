# google-maps-addon

[![Build Status](https://travis-ci.org/SamvelRaja/google-maps-addon.svg?branch=master)](https://travis-ci.org/SamvelRaja/google-maps-addon)

[![NPM](https://nodei.co/npm/google-maps-addon.png)](https://nodei.co/npm/google-maps-addon/)

# An Ember Addon

Google maps [ember addon](http://www.emberaddons.com/) easy to consume.


## Installation

* `ember install:addon google-maps-addon`


## Running Tests

* `ember test`
* `ember test --server`

## Usage

```hbs
{{google-maps-addon mapOptions=mapOptions}}
```

We have the **JSON** **mapOptions** the powerful way to have your configurations.


```js
mapOptions : {
  latitude : 'Your latitude',
  longitude : 'Your longitude',
  zoom : 'Your prefered zooming level',
  //Mouse events
  click : function (event){
    //I promise a callback is assured for the particular event so
    //have your code here
  },
  //markers array
  markers : [
    {
      latitude : 'Your marker latitude if empty will takes up the center latitude',
      longitude : 'Your marker longitude if empty will takes up the center longitude',
      title : 'Your title, if not provided it takes up as empty string',
      animation : 'DROP' || 'BOUNCE',
      timeout : timeout after the window loads,
      icon : 'Specify the path of the icon',
      draggable:true,
      //Mouse events
      click : function (event){
        //I promise a callback is assured for the particular event so
        //have your code here
      }
    },
    {
      latitude : 'Your marker latitude if empty will takes up the center latitude',
      longitude : 'Your marker longitude if empty will takes up the center longitude',
      title : 'Your title, if not provided it takes up as empty string',
      animation : 'DROP' || 'BOUNCE',
      timeout : timeout after the window loads,
      icon : 'Specify the path of the icon',
      draggable:true,
      //Mouse events
      click : function (event){
        //I promise a callback is assured for the particular event so
        //have your code here
      }
    }
  ],
  //infowindow will be default open.
  infowindow : {
    content : 'Your HTML content here',
    latitude : 'Your infowindow latitude if empty will takes up the center latitude',
    longitude : 'Your infowindow longitude if empty will takes up the center longitude',
    maxWidth : 'The maximum width of the infowindow' //in number
    pixelOffset : 'The offset, in pixels, of the tip of the info window from the point on the map at whose geographical coordinates the info window is anchored. If an InfoWindow is opened with an anchor, the pixelOffset will be calculated from the anchors anchorPoint property.'
  }

}
```

**Supported Mouse events**

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

[DEMO](http://samvelraja.github.io/#/demos/googlemaps)

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
