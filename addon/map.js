import Ember from 'ember';

import MarkersMixin from './objects/markers';
import PolygonsMixin from './objects/polygons';
import CirclesMixin from './objects/circles';

import mouseEvents from './mouse-events';

export default Ember.Object.extend(MarkersMixin, PolygonsMixin, CirclesMixin, {
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
    var mapElement = this.owner.$('div.map-canvas')[0];
    return new google.maps.Map(mapElement, mapOptions);
  },
  /**
  @method initializeMouseEventCallbacks
  @usage
    To initialize the `mouseevents` to the `mapElement`
  **/
  initializeMouseEventCallbacks() {
    let mapOptions = this.owner.get('mapOptions');
    var mapElement = this.owner.get('mapElement');
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
    var mapElement = this.owner.get('mapElement');
    let mapOptions = this.owner.get('mapOptions');
    let infoWindowOptions = mapOptions.infowindow;
    if (infoWindowOptions) {
      let longitude = infoWindowOptions.longitude || this.owner.get('longitude');
      let latitude = infoWindowOptions.latitude || this.owner.get('latitude');
      let infoPostion = new google.maps.LatLng(latitude,longitude);
      if (infoWindowOptions instanceof Object && !(infoWindowOptions instanceof Array)) {
        var infoWindow = new google.maps.InfoWindow({
          content: infoWindowOptions.content || 'empty content',
          position: infoPostion,
          pixelOffset: infoWindowOptions.pixelOffset || undefined,
          maxWidth: infoWindowOptions.maxWidth || undefined
        });
        infoWindow.open(mapElement);
      }
    }
  },

  /**
  @method clearAllMarkers
  @usage
    To clear All the Markers from the map.
    Have to find a way to hook this function
  **/
  clearAllMarkers() {
    var markers = this.owner.get('markers');
    if (markers instanceof Array) {
      for (let i = 0; i < markers.length; i++) {
        markers[i] = this.clearMarker(markers[i]);
      }
    } else {
      markers = this.clearMarker(markers);
    }
    this.owner.set('markers', markers);
  }
});
