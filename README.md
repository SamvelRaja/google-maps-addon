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
  //If you have single marker then can use this,
  //prefer to use markers option even for single marker
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
  },
  //Multiple markers are supported by
  markers : [
    {
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
    },
    {
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
  ]

}
```
**NOTE** markers has more priority than marker

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

More Markers support (Dragable marker,info window)

Need more interactions back into the component than getting out of component

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
