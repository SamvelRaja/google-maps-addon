import Ember from 'ember';

import BaseShape from './base';

export default BaseShape.extend({
  createInstance() {
    return new google.maps.InfoWindow();
  },

  defaultOptions() {
    return {};
  },

  normalizeOptions(options) {
    return {
      content: options.content,
      position: new google.maps.LatLng(options.latitude, options.longitude),
      pixelOffset: options.pixelOffset,
      maxWidth: options.maxWidth
    };
  },

  openWindow: Ember.on("create", function() {
    this.get("instance").open(this.get("mapElement"));
  })
});
