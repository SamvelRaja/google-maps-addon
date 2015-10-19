import Ember from 'ember';
import Helpers from '../helpers';

export default Ember.Component.extend({
  setupMap: Ember.on('willInsertElement', function() {
    Helpers.initializeOptions(this);

    // Checking for the availability of Google Maps JavaScript SDK, the hero
    if (window.google) {
      this.set('mapElement', Helpers.createMapElement(this));

      this.updateMapOptions();
      this.updateMarkers();
    } else {
      console.error('Please include the Google Maps JavaScript SDK.');
    }
  }),

  updateMapOptionsObserver: Ember.observer('mapOptions', function() {
    this.updateMapOptions();
  }),

  updateMarkersObserver: Ember.observer('markerOptions', function() {
    this.updateMarkers();
  }),

  updateMapOptions() {
    if (this.get('mapElement')) {
      Helpers.initializeMouseEventCallbacks(this);
      Helpers.initializeInfowindow(this);
    }
  },

  updateMarkers() {
    if (this.get('mapElement')) {
      Helpers.drawAllMarkers(this);
    }
  }
});
