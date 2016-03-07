import Ember from 'ember';

import ShapesManager from './mixins/shapes-manager';

import events from './events';

export default Ember.Object.extend(ShapesManager, {
  /**
  @method initializeOptions
  @usage
    To initialize the `mapOptions`
  **/
  initializeOptions() {
    let mapOptions = this.owner.get('mapOptions');
    this.owner.setProperties({
      latitude: mapOptions.latitude || '0',
      longitude: mapOptions.longitude || '0',
      zoom: mapOptions.zoom || 8
    });
  },
  /**
  @method createMapElement
  @usage
    To create a map element using mapOptions
    It creates the map element in the $(div.map-canvas)
  @return map (google map element for other handlings)
  **/
  createMapElement() {
    const providedOptions = this.owner.get('mapOptions');
    const defaultOptions = {
      center: new google.maps.LatLng(this.owner.get('latitude'), this.owner.get('longitude')),
      zoom: this.owner.get('zoom'),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const mapOptions = Ember.merge(defaultOptions, providedOptions);

    let mapElement = this.owner.$('div.map-canvas')[0];

    this.set("map", new google.maps.Map(mapElement, mapOptions));
    return this.get("map");
  },
  /**
  @method initializeMouseEventCallbacks
  @usage
    To initialize the `mouseevents` to the `mapElement`
  **/
  initializeMouseEventCallbacks() {
    let mapOptions = this.owner.get('mapOptions');
    let mapElement = this.owner.get('mapElement');
    events.forEach(function(event) {
      if (typeof mapOptions[event] === 'function') {
        google.maps.event.addListener(mapElement, event, mapOptions[event]);
      }
    });
  }
});
