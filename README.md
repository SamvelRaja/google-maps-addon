# google-maps-addon

A thin wrapper around the googlemaps converting it as ember addon

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

mapOptions is a object that with your, **latitude**,**longitude** and **zoom**

```js
mapOptions : {
  latitude : 'your latitude',
  longitude : 'your longitude',
  zoom : 'prefered zooming',
  //Mouse events
  click : function (event){
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

Loader support and few code enhancements

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
