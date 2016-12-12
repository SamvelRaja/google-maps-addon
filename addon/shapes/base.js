import Ember from 'ember';

import events from '../events';
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

  postCreate() {
    // Override point, optional
  },

  update() {
    if (!this.get('instance')) {
      this.set('instance', this.createInstance());
      Ember.sendEvent(this, "create");
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
      if (!this.get('isDestroyed')) {
        this.get('instance').setMap(this.get('mapElement'));
      }
    }, this.get('options.timeout') || null);
  },

  setAttributes(attributes) {
    this.get('instance').setOptions(attributes);
  },

  addEvents() {
    let options = this.get('options');
    let instance = this.get('instance');

    events.forEach((eventName) => {
      google.maps.event.clearListeners(instance, eventName);

      if (typeof options[eventName] === 'function') {
        google.maps.event.addListener(instance, eventName, options[eventName]);
      }
    });
  },

  remove() {
    this.destroy();
    this.get('instance').setMap(null);
  }
});
