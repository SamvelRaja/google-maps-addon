export default{
  /***
  @method initializeOptions
  @param context
  @usage
    To initialize the `MapOptions` as `context' properties`
  ***/
  initializeOptions : function(context){
    let map_options = context.get('MapOptions');
    context.setProperties({
      lat : map_options.latitude || '0',
      lng : map_options.longitude || '0',
      zoom : map_options.zoom || 8
    });
  },
  /**
  @method createMapElement
  @param context
  @usage
    To create a map element using mapOptions
    It creates the map element in the $(div.map-canvas)
  @return map (google map element for other handlings)
  **/
  createMapElement : function(context){
    let mapOptions = {
        center: new google.maps.LatLng(context.get('lat');, context.get('lng')),
        zoom: context.get('zoom'),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map_element = context.$('div.map-canvas')[0];
    var map = new google.maps.Map(map_element, mapOptions);
    return map;
  }
};
