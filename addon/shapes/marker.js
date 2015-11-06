import Ember from 'ember';

import BaseShape from './base';

const DEFAULT_MARKER_IMAGE = '//mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1';

export default BaseShape.extend({
  build(mapElement, options) {
    let timeout = options.timeout || 0;

    if (!this.marker) {
      this.marker = new google.maps.Marker();
      this.marker.googleMapsAddonKey = options.key;
    }

    Ember.run.later(() => {
      this.marker.setMap(mapElement);
    }, timeout);

    return this.marker;
  },

  setup(options) {
    let latitude = options.latitude;
    let longitude = options.longitude;
    let animation = google.maps.Animation[options.animation] || null;
    let imagePath = options.icon || DEFAULT_MARKER_IMAGE;
    let draggable = options.draggable || false;
    let myLatlng = new google.maps.LatLng(latitude, longitude);

    this.setAttributes(this.marker, {
      position: myLatlng,
      animation: animation,
      draggable: draggable,
      title: options.title || '',
      icon: imagePath
    });

    this.addEvents(this.marker, options);
  },

  remove() {
    this.marker.setMap(null);
  }
});
