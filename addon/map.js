import Ember from 'ember';

import ShapesManager from './mixins/shapes-manager';

import mouseEvents from './mouse-events';

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
    let mapOptions = {
      center: new google.maps.LatLng(this.owner.get('latitude'), this.owner.get('longitude')),
      zoom: this.owner.get('zoom'),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

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
    mouseEvents.forEach(function(event) {
      if (mapOptions[event]) {
        if (typeof mapOptions[event] === 'function') {
          google.maps.event.addListener(mapElement, event, mapOptions[event]);
        }
      }
    });
  },
  /**
  @method initializeInfowindow
  @usage
    To create and the info window
  **/
  initializeInfowindow() {
    let mapElement = this.owner.get('mapElement');
    let mapOptions = this.owner.get('mapOptions');
    let infoWindowOptions = mapOptions.infowindow;
    if (infoWindowOptions) {
      let longitude = infoWindowOptions.longitude || this.owner.get('longitude');
      let latitude = infoWindowOptions.latitude || this.owner.get('latitude');
      let infoPostion = new google.maps.LatLng(latitude,longitude);
      if (infoWindowOptions instanceof Object && !(infoWindowOptions instanceof Array)) {
        let infoWindow = new google.maps.InfoWindow({
          content: infoWindowOptions.content || 'empty content',
          position: infoPostion,
          pixelOffset: infoWindowOptions.pixelOffset || undefined,
          maxWidth: infoWindowOptions.maxWidth || undefined
        });
        infoWindow.open(mapElement);
      }
    }
  }
});
