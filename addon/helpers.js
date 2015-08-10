import Ember from 'ember';
/**
@let mouseEvents
@type array
Supported mouse events by googlemaps
  ref 'https://developers.google.com/maps/documentation/javascript/reference#events_50'
**/
let mouseEvents = [
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
    //First preference is to 'markers' array over the 'marker' object
    let marker_options =  map_options.markers;
    context.setProperties({
      latitude : map_options.latitude || '0',
      longitude : map_options.longitude || '0',
      zoom : map_options.zoom || 8,
    });
    if( marker_options instanceof Array  && !Ember.isEmpty(marker_options)){
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
  @method drawAllMarkers
  @param context
  @usage
    To draw the `markers` to the `map_element`
  **/
  drawAllMarkers : function(context) {
    var marker_options = context.get('markerOptions');
    var markers = [];
    var self = this;
    for(let i=0;i<marker_options.length;i++){
      markers[i] = self.drawMarker(context,marker_options[i]);
    }
    context.set('markers',markers);
  },
  /**
  @method drawMarker
  @param context,marker_options
  @usage
    To draw the `marker` to the `map_element`
  **/
  drawMarker : function(context,marker_options) {
    var map_element = context.get('map_element');
    let latitude = marker_options.latitude || context.get('latitude');
    let longitude = marker_options.longitude || context.get('longitude');
    let animationIndex = google.maps.Animation[marker_options.animation] || null;
    let timeout = marker_options.timeout || 0;
    let image_path = marker_options.icon || '//mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1';
    let draggable = marker_options.draggable || false;
    var self = this;
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var marker;
    window.setTimeout(function() {
     marker = new google.maps.Marker({
        position: myLatlng,
        animation: animationIndex,
        map: map_element,
        draggable: draggable,
        title: marker_options.title || '',
        icon : image_path
      });
      marker = self.initializeMarkerMouseEventCallbacks(context,marker,marker_options);
      return marker;
    }, timeout);
  },
  /**
  @method initializeMarkerMouseEventCallbacks
  @param context,marker,marker_options
  @usage
    To initialize the `markermouseevents` to the `marker_obj`
  **/
  initializeMarkerMouseEventCallbacks : function(context,marker,marker_options) {
    mouseEvents.forEach(function(event) {
      if(marker_options[event]){
        if(typeof marker_options[event] === 'function'){
          google.maps.event.addListener(marker, event, marker_options[event]);
        }
      }
    });
    return marker;
  },

  /**
  @method clearAllMarkers
  @param context
  @usage
    To clear All the Markers from the map.
    Have to find a way to hook this function
  **/
  clearAllMarkers : function(context) {
    var markers = context.get('markers');
    if(markers instanceof Array){
      for(let i=0;i<markers.length;i++){
        markers[i]=this.clearMarker(markers[i]);
      }
    } else {
      markers = this.clearMarker(markers);
    }
    context.set('markers',markers);
  },
  /**
  @method clearMarker
  @param marker
  @usage
    To clear the Marker from the map.
    Have to find a way to hook this function
  **/
  clearMarker : function(marker) {
    marker.setMap(null);
  },
};
