import Ember from 'ember';
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
    let marker_options = map_options.marker;
    context.setProperties({
      latitude : map_options.latitude || '0',
      longitude : map_options.longitude || '0',
      zoom : map_options.zoom || 8,
    });
    if( typeof marker_options === 'object' && !Ember.isEmpty(marker_options)){
      context.set('markerOptions', marker_options);
    }
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
  @method drawMarker
  @param context
  @usage
    To draw the `marker` to the `map_element`
  **/
  drawMarker : function(context) {
    let marker_options = context.get('markerOptions');
    var map_element = context.get('map_element');
    let latitude = marker_options.latitude || context.get('latitude');
    let longitude = marker_options.longitude || context.get('longitude');
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map_element,
      title: marker_options.title || ''
    });
    context.set('marker_obj',marker);
    this.initializeMarkerMouseEventCallbacks(context);
  },
  /**
  @method initializeMarkerMouseEventCallbacks
  @param context
  @usage
    To initialize the `markermouseevents` to the `marker_obj`
  **/
  initializeMarkerMouseEventCallbacks : function(context) {
    let marker_options = context.get('markerOptions');
    //This needs to be changed as array for the multiple marker support
    var marker = context.get('marker_obj');
    mouseEvents.forEach(function(event) {
      if(marker_options[event]){
        if(typeof marker_options[event] === 'function'){
          google.maps.event.addListener(marker, event, marker_options[event]);
        }
      }
    });
    context.set('marker_obj',marker);
  },
};
