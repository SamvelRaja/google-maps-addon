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
    To initialize the `mapOptions` as `context' properties`
  **/
  initializeOptions : function(context) {
    let mapOptions = context.get('mapOptions') || context.get('MapOptions');
    //First preference is to 'markers' array over the 'marker' object
    let markerOptions =  mapOptions.markers;
    context.setProperties({
      latitude : mapOptions.latitude || '0',
      longitude : mapOptions.longitude || '0',
      zoom : mapOptions.zoom || 8
    });
    if ( markerOptions instanceof Array  && !Ember.isEmpty(markerOptions)) {
      context.set('markerOptions', markerOptions);
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
    var mapElement = context.$('div.map-canvas')[0];
    var map = new google.maps.Map(mapElement, mapOptions);
    return map;
  },
  /**
  @method initializeMouseEventCallbacks
  @param context
  @usage
    To initialize the `mouseevents` to the `mapElement`
  **/
  initializeMouseEventCallbacks : function(context) {
    let mapOptions = context.get('mapOptions') || context.get('MapOptions');
    var mapElement = context.get('mapElement');
    mouseEvents.forEach(function(event) {
      if (mapOptions[event]) {
        if (typeof mapOptions[event] === 'function') {
          google.maps.event.addListener(mapElement, event, mapOptions[event]);
        }
      }
    });
  },
  /**
  @method drawAllMarkers
  @param context
  @usage
    To draw the `markers` to the `mapElement`
  **/
  drawAllMarkers : function(context) {
    var markerOptions = context.get('markerOptions');
    var markers = [];
    var self = this;
    for (let i=0;i<markerOptions.length;i++) {
      markers[i] = self.drawMarker(context, markerOptions[i]);
    }
    context.set('markers', markers);
  },
  /**
  @method drawMarker
  @param context,markerOptions
  @usage
    To draw the `marker` to the `mapElement`
  **/
  drawMarker : function(context, markerOptions) {
    let mapElement = context.get('mapElement');
    let latitude = markerOptions.latitude || context.get('latitude');
    let longitude = markerOptions.longitude || context.get('longitude');
    let animationIndex = google.maps.Animation[markerOptions.animation] || null;
    let timeout = markerOptions.timeout || 0;
    let image_path = markerOptions.icon || '//mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1';
    let draggable = markerOptions.draggable || false;
    let myLatlng = new google.maps.LatLng(latitude,longitude);
    let marker = new google.maps.Marker({
      position: myLatlng,
      animation: animationIndex,
      draggable: draggable,
      title: markerOptions.title || '',
      icon : image_path
    });
    marker = this.initializeMarkerMouseEventCallbacks(context, marker, markerOptions);
    window.setTimeout(function() {
      marker.setMap(mapElement);
    }, timeout);
    return marker;
  },

  /**
  @method initializeMarkerMouseEventCallbacks
  @param context,marker,markerOptions
  @usage
    To initialize the `markermouseevents` to the `marker_obj`
  **/
  initializeMarkerMouseEventCallbacks : function(context, marker, markerOptions) {
    mouseEvents.forEach(function(event) {
      if (markerOptions[event]) {
        if (typeof markerOptions[event] === 'function') {
          google.maps.event.addListener(marker, event, markerOptions[event]);
        }
      }
    });
    return marker;
  },
  /**
  @method initializeInfowindow
  @param context
  @usage
    To create and the info window
  **/
  initializeInfowindow : function(context) {
    var mapElement = context.get('mapElement');
    let mapOptions = context.get('mapOptions') || context.get('MapOptions');
    let infoWindowOptions = mapOptions.infowindow;
    if (infoWindowOptions) {
      let longitude = infoWindowOptions.longitude || context.get('longitude');
      let latitude = infoWindowOptions.latitude || context.get('latitude');
      let infoPostion = new google.maps.LatLng(latitude,longitude);
      if (infoWindowOptions instanceof Object && !(infoWindowOptions instanceof Array)) {
        var infoWindow = new google.maps.InfoWindow({
          content: infoWindowOptions.content || 'empty content',
          position : infoPostion,
          pixelOffset: infoWindowOptions.pixelOffset || undefined,
          maxWidth: infoWindowOptions.maxWidth || undefined
        });
        infoWindow.open(mapElement);
      }
    }
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
    if (markers instanceof Array) {
      for (let i=0;i<markers.length;i++) {
        markers[i]=this.clearMarker(markers[i]);
      }
    } else {
      markers = this.clearMarker(markers);
    }
    context.set('markers', markers);
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
  }
};
