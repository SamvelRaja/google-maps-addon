import Ember from 'ember';

import BaseShape from './base';

export default BaseShape.extend({
  createInstance() {
    return new google.maps.Circle();
  },

  defaultOptions() {
    return {
      fillColor: 'red',
      fillOpacity: 0.5,
      strokeColor: 'red',
      strokeWeight: 2,
      strokeOpacity: 0.6,
      draggable: false,
      editable: false,
      visible: true,
      zIndex: null
    };
  },

  normalizeOptions(options) {
    return {
      center: new google.maps.LatLng(options.latitude, options.longitude),
      fillColor: options.fillColor,
      fillOpacity: options.fillOpacity,
      strokeColor: options.strokeColor,
      strokeWeight: options.strokeWeight,
      strokeOpacity: options.strokeOpacity,
      radius: options.radius,
      draggable: options.draggable,
      editable: options.editable,
      visible: options.visible,
      zIndex: options.zIndex
    }
  }
});
