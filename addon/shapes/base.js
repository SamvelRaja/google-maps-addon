import Ember from 'ember';

import mouseEvents from '../mouse-events';
import { diffObjects } from '../helpers/diff-objects-operations';

export default Ember.Object.extend({
  instance: false,
  mapElement: null,
  options: null,

  createInstance() {
    // Override
  },

  defaultOptions() {
    return {};
  },

  normalizeOptions(options) {
    // Override
    return options;
  },

  update() {
    if (!this.get('instance')) {
      this.set('instance', this.createInstance());
    }

    this.addEvents();

    let mergedOptions = Ember.merge(this.defaultOptions(), this.get('options'));
    let newOptions = this.normalizeOptions(mergedOptions);

    let oldOptions = this.get('oldOptions');
    if (oldOptions) {
      this.setAttributes(diffObjects(newOptions, oldOptions));
    } else {
      this.setAttributes(newOptions);
    }

    this.set('oldOptions', newOptions);
  },

  addToMapWithTimeout() {
    Ember.run.later(() => {
      this.get('instance').setMap(this.get('mapElement'));
    }, this.get('options.timeout') || null);
  },

  setAttributes(attributes) {
    let instance = this.get('instance');
    instance.setOptions(attributes);
  },

  addEvents() {
    let options = this.get('options');

    mouseEvents.forEach((eventName) => {
      if (typeof options[eventName] === 'function') {
        google.maps.event.addListener(this.get('instance'), eventName, options[eventName]);
      }
    });
  },

  remove() {
    this.get('instance').setMap(null);
  }
});
