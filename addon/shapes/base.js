import Ember from 'ember';

import mouseEvents from '../mouse-events';

export default Ember.Object.extend({
  // Build the actual shape instance
  build(mapElement, options) {
    // override
  },

  // Setup the options on the shape instance
  setup(options) {
    // override
  },

  setAttributes(object, attributes) {
    Object.keys(attributes).forEach((key) => {
      object[('set ' + key).camelize()].call(object, attributes[key]);
    });
  },

  addEvents(object, options) {
    mouseEvents.forEach((eventName) => {
      if (typeof options[eventName] === 'function') {
        google.maps.event.addListener(object, eventName, options[eventName]);
      }
    });
  }
});
