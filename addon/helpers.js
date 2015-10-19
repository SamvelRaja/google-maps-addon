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

export default {
  /**
  @method initializeOptions
  @param context
  @usage
    To initialize the `mapOptions` as `context' properties`
  **/
  initializeOptions(context) {
    let mapOptions = context.get('mapOptions');
    context.setProperties({
      latitude: mapOptions.latitude || '0',
      longitude: mapOptions.longitude || '0',
      zoom: mapOptions.zoom || 8
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
  createMapElement(context) {
    let mapOptions = {
      center: new google.maps.LatLng(context.get('latitude'), context.get('longitude')),
      zoom: context.get('zoom'),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapElement = context.$('div.map-canvas')[0];
    return new google.maps.Map(mapElement, mapOptions);
  },
  /**
  @method initializeMouseEventCallbacks
  @param context
  @usage
    To initialize the `mouseevents` to the `mapElement`
  **/
  initializeMouseEventCallbacks(context) {
    let mapOptions = context.get('mapOptions');
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
  drawAllMarkers(context) {
    var markerOptions = context.get('markerOptions');
    markerOptions.forEach((markerOption) => {
      Ember.assert('A `key` attribute must be provided for all `google-maps-addon` markers', !!markerOption.key);
    });

    var markerOperations = this.diffMarkers(markerOptions, context.get('markers'));

    var markers = [];

    // Add new markers
    console.log('Adding %d markers', markerOperations.added.length);
    markerOperations.added.forEach((markerOption) => {
      markers.push(this.drawMarker(context, markerOption));
    });

    // Updated markers
    console.log('Updated %d markers', markerOperations.updated.length);
    markerOperations.updated.forEach((operation) => {
      markers.push(this.drawMarker(context, operation.markerOption, operation.marker));
    });

    // Remove old markers
    console.log('Removed %d markers', markerOperations.removed.length);
    markerOperations.removed.forEach((operation) => {
      this.clearMarker(operation.marker);
    });

    context.set('markers', markers);
  },
  /**
  @method drawMarker
  @param context,markerOptions,marker
  @usage
    To draw the `marker` to the `mapElement`
  **/
  drawMarker(context, markerOptions, marker) {
    let mapElement = context.get('mapElement');
    let latitude = markerOptions.latitude || context.get('latitude');
    let longitude = markerOptions.longitude || context.get('longitude');
    let animationIndex = google.maps.Animation[markerOptions.animation] || null;
    let timeout = markerOptions.timeout || 0;
    let imagePath = markerOptions.icon || '//mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1';
    let draggable = markerOptions.draggable || false;
    let myLatlng = new google.maps.LatLng(latitude,longitude);
    if (!marker) {
      marker = new google.maps.Marker();
      marker.googleMapsAddonKey = markerOptions.key;
    }
    marker = this.initializeMarkerWithOptions(marker, {
      position: myLatlng,
      animation: animationIndex,
      draggable: draggable,
      title: markerOptions.title || '',
      icon: imagePath
    });
    marker = this.initializeMarkerMouseEventCallbacks(context, marker, markerOptions);
    Ember.run.later(function() {
      marker.setMap(mapElement);
    }, timeout);
    return marker;
  },
  /**
  @method initializeMarkerWithOptions
  @param marker,markerOptions
  @usage
    To initialize a marker
  **/
  initializeMarkerWithOptions(marker, markerOptions) {
    Object.keys(markerOptions).forEach((key) => {
      marker[('set ' + key).camelize()].call(marker, markerOptions[key]);
    });
    return marker;
  },
  /**
  @method initializeMarkerMouseEventCallbacks
  @param context,marker,markerOptions
  @usage
    To initialize the `markermouseevents` to the `marker_obj`
  **/
  initializeMarkerMouseEventCallbacks(context, marker, markerOptions) {
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
  initializeInfowindow(context) {
    var mapElement = context.get('mapElement');
    let mapOptions = context.get('mapOptions');
    let infoWindowOptions = mapOptions.infowindow;
    if (infoWindowOptions) {
      let longitude = infoWindowOptions.longitude || context.get('longitude');
      let latitude = infoWindowOptions.latitude || context.get('latitude');
      let infoPostion = new google.maps.LatLng(latitude,longitude);
      if (infoWindowOptions instanceof Object && !(infoWindowOptions instanceof Array)) {
        var infoWindow = new google.maps.InfoWindow({
          content: infoWindowOptions.content || 'empty content',
          position: infoPostion,
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
  clearAllMarkers(context) {
    var markers = context.get('markers');
    if (markers instanceof Array) {
      for (let i = 0; i < markers.length; i++) {
        markers[i] = this.clearMarker(markers[i]);
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
  clearMarker(marker) {
    marker.setMap(null);
  },

  /**
  @method diffMarkers
  @param markerOptions
  @param oldMarkers
  @usage
    Diff a new set of marker options to and old set of map markers
  **/
  diffMarkers(markerOptions, oldMarkers) {
    var markerOperations = {
      added: [],
      removed: [],
      updated: []
    };

    // If old markers are present, figure out which are new and old and removed
    if (oldMarkers) {
      var oldMarkersByKey = {};
      oldMarkers.forEach((marker) => {
        oldMarkersByKey[marker.googleMapsAddonKey] = marker;
      });

      markerOptions.forEach((markerOption) => {
        if (oldMarkersByKey[markerOption.key]) {
          let marker = oldMarkersByKey[markerOption.key];
          markerOperations.updated.push({ markerOption, marker });

          delete oldMarkersByKey[markerOption.key];
        } else {
          markerOperations.added.push(markerOption);
        }
      });

      Object.keys(oldMarkersByKey).forEach((key) => {
        let marker = oldMarkersByKey[key];
        markerOperations.removed.push({ marker });
      });
    // No old markers were present, all are new
    } else {
      markerOperations.added = markerOptions;
    }

    return markerOperations;
  }
};
