import Ember from 'ember';
import Helpers from '../helpers';

export default Ember.Component.extend({
  setupMap: Ember.observer('mapOptions', Ember.on('didInsertElement', function() {
    // Initializing the options into the context
    Helpers.initializeOptions(this);

    // Checking for the availability of googlemaps js the hero
    if (window.google) {
      let mapElement = Helpers.createMapElement(this);

      // Setting up the mapElement in the context
      if (mapElement) {
        this.set('mapElement', mapElement);

        let markerOptions = this.get('markerOptions');
        Helpers.initializeMouseEventCallbacks(this);

        if (markerOptions) {
          Helpers.drawAllMarkers(this);
        }
        Helpers.initializeInfowindow(this);
      }
    } else {
      console.error('Need to include the googlemaps js');
    }
  }))
});
