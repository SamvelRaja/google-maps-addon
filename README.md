# google-maps-addon

##An Ember Addon

A thin wrapper around the google maps to make it as a ready to use [ember addon](http://www.emberaddons.com/)

[![NPM](https://nodei.co/npm/google-maps-addon.png)](https://nodei.co/npm/google-maps-addon/)

Installation

```bash
ember install google-maps-addon --save-dev
```

**--save-dev** for adding the addon automatically into you application package.json

That's it, Google maps ember addon ready to use.

```hbs
{{google-maps-addon MapOptions=mapOptions}}
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
  marker : {
    latitude : 'Your marker latitude if empty will takes up the center latitude',
    longitude : 'Your marker longitude if empty will takes up the center longitude',
    title : 'Your title, if not provided it takes up as empty string',
    animation : 'DROP' || 'BOUNCE',
    timeout : timeout after the window loads,
    icon : 'Specify the path of the icon',
    //Mouse events
    click : function (event){
      //I promise a callback is assured for the particular event so
      //have your code here
    }
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
Feel free to raise a issue or feature request.

Next update would be,

More Markers support (Multiple markers)

Need more interactions back into the component than getting out of component

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
