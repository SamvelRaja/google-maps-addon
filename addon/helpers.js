/**
@var mouseEvents
@type array
Supported mouse events by googlemaps
  ref 'https://developers.google.com/maps/documentation/javascript/reference#events_50'
**/
var mouseEvents = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'mousemove',
  'mouseout',
  'mouseover',
  'rightclick'
];

export default{
  /**
  @method initializeOptions
  @param context
  @usage
    To initialize the `MapOptions` as `context' properties`
  **/
  initializeOptions : function(context) {
    let map_options = context.get('MapOptions');
    context.setProperties({
      latitude : map_options.latitude || '0',
      longitude : map_options.longitude || '0',
      zoom : map_options.zoom || 8
    });
  },
  /**
  @method initializeMouseEventCallbacks
  @param context
  @usage
    To initialize the `mouseevents` to the `map_element`
  **/
  initializeMouseEventCallbacks : function(context) {
    let map_options = context.get('MapOptions');
    var map_element = context.get('map_element');
    mouseEvents.forEach(function(event) {
      if(map_options[event]){
        if(typeof map_options[event] === 'function'){
          google.maps.event.addListener(map_element, event, map_options[event]);
        }
      }
    });
  },
  /**
  @method createMapElement
  @param context
  @usage
    To create a map element using mapOptions
    It creates the map element in the $(div.map-canvas)
  @return map (google map element for other handlings)
  **/
  createMapElement : function(context) {
    let mapOptions = {
        center: new google.maps.LatLng(context.get('latitude'), context.get('longitude')),
        zoom: context.get('zoom'),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map_element = context.$('div.map-canvas')[0];
    var map = new google.maps.Map(map_element, mapOptions);
    return map;
  }
};
