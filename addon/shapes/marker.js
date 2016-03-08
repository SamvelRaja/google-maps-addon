import BaseShape from './base';

const DEFAULT_MARKER_IMAGE = '//mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1';

export default BaseShape.extend({
  createInstance() {
    return new google.maps.Marker();
  },

  defaultOptions() {
    return {
      icon: DEFAULT_MARKER_IMAGE,
      clickable: true
    };
  },

  normalizeOptions(options) {
    return {
      position: new google.maps.LatLng(options.latitude, options.longitude),
      animation: google.maps.Animation[options.animation] || null,
      icon: options.icon,
      title: options.title,
      anchorPoint: options.anchorPoint,
      attribution: options.attribution,
      clickable: options.clickable,
      crossOnDrag: options.crossOnDrag,
      cursor: options.cursor,
      draggable: options.draggable,
      label: options.label,
      opacity: options.opacity,
      optimized: options.optimized,
      place: options.place,
      shape: options.shape,
      visible: options.visible,
      zIndex: options.zIndex
    };
  }
});
