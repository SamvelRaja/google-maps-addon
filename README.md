# google-maps-addon

#An Ember Addon

Google maps [ember addon](http://www.emberaddons.com/) easy to consume.

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
Feel free to raise an issue or feature request.

**DEMO**

![google-maps-addon](https://raw.githubusercontent.com/SamvelRaja/google-maps-addon/master/demo/google-maps-addon.gif)

Next update would be,

More info window support (events, adding it to markers)

Need more interactions back into the component than getting out of component

#Contributions

Contributions are welcome!

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
