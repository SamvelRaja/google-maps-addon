# google-maps-addon

A thin wrapper around the googlemaps to make it as a ready to use ember addon

[![NPM](https://nodei.co/npm/google-maps-addon.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/google-maps-addon/)

Simple usages

```bash
ember install google-maps-addon --save-dev
```

**--save-dev** for adding the addon automatically into you application package.json

That's it, Google maps addon ready to use.

```hbs
{{google-maps-addon MapOptions=mapOptions}}
```

We have the **JSON** **mapOptions** the simple way to have your configurations.


```js
mapOptions : {
  latitude : 'Your latitude',
  longitude : 'Your longitude',
  zoom : 'Your prefered zooming level',
  marker : {
    latitude : 'Your marker latitude if empty will takes up the center latitude',
    longitude : 'Your marker longitude if empty will takes up the center longitude',
    title : 'Your title, if not provided it takes up as empty string'
  }
  //Mouse events
  click : function (event){
    //I promise a callback is assured for the particular event
    //your code here
  }
}
```
Supported Mouse events

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
Next update would be,

More Markers support (Multiple markers, Marker events, Custom marker image)

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
