import Ember from 'ember';

import diffObjects from '../helpers/diff-objects';
import assertKeyExists from '../helpers/assert-key-exists';

import mouseEvents from '../mouse-events';

export default Ember.Mixin.create({
  /**
  @method drawAllMarkers
  @usage
    To draw the `markers` to the `mapElement`
  **/
  drawAllMarkers() {
    var markerOptions = this.owner.get('markerOptions');
    assertKeyExists(markerOptions, 'markers');

    var markerOperations = diffObjects(markerOptions, this.owner.get('markers'));
    var markers = [];

    // Add new markers
    markerOperations.added.forEach((markerOption) => {
      markers.push(this.drawMarker(markerOption));
    });

    // Updated markers
    markerOperations.updated.forEach((operation) => {
      markers.push(this.drawMarker(operation.objectOption, operation.object));
    });

    // Remove old markers
    markerOperations.removed.forEach((operation) => {
      this.clearMarker(operation.object);
    });

    this.owner.set('markers', markers);
  },

  /**
  @method drawMarker
  @param markerOptions,marker
  @usage
    To draw the `marker` to the `mapElement`
  **/
  drawMarker(markerOptions, marker) {
    let mapElement = this.owner.get('mapElement');
    let latitude = markerOptions.latitude || this.owner.get('latitude');
    let longitude = markerOptions.longitude || this.owner.get('longitude');
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
    marker = this.initializeMarkerMouseEventCallbacks(marker, markerOptions);
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
  @param marker,markerOptions
  @usage
    To initialize the `markermouseevents` to the `marker_obj`
  **/
  initializeMarkerMouseEventCallbacks(marker, markerOptions) {
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
  @method clearMarker
  @param marker
  @usage
    To clear the Marker from the map.
    Have to find a way to hook this function
  **/
  clearMarker(marker) {
    marker.setMap(null);
  }
});
