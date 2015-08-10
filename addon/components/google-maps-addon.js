import Ember from 'ember';
import Helpers from '../helpers';
export default Ember.Component.extend({
  didInsertElement: function() {
    var map_element;
    //Initializing the options into the context
    Helpers.initializeOptions(this);
    //Checking for the availability of googlemaps js the hero
    if(window.google){
      map_element = Helpers.createMapElement(this);

      //Setting up the map_element in the context
      if(map_element){
        this.set('map_element',map_element);
        let marker_options = this.get('markerOptions');
        Helpers.initializeMouseEventCallbacks(this);
        if(marker_options){
          Helpers.drawAllMarkers(this);
        }
        Helpers.initializeInfowindow(this);
      }
    } else {
      //Assert it if the hero(googlemaps js) is unavail
      console.assert('Need to include the googlemaps js');
    }
  }
});
