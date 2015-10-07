import Ember from 'ember';

export default Ember.Controller.extend({
  inputObj: {
      latitude : '12.976299881670053',
      longitude : '80.13112306594849',
      zoom : 7,
      click : function(recEvent) {
        console.log('map_click' + recEvent);
      },
      dblclick : function(recEvent) {
        console.log('map_double_click' + recEvent);
      },
      drag : function() {
        console.log('map_drag');
      },
      dragend : function() {
        console.log('map_dragend');
      },
      dragstart : function() {
        console.log('map_dragstart');
      },
      mousemove : function(recEvent) {
        console.log('map_mousemove' + recEvent);
      },
      mouseout : function(recEvent) {
        console.log('map_mouseout' + recEvent);
      },
      mouseover : function(recEvent) {
        console.log('map_mouseover' + recEvent);
      },
      rightclick : function(recEvent) {
        console.log('map_rightclick' + recEvent);
      },
      infowindow : {
        content : '<div>Info Window</div>',
        latitude : '12.976299881670053',
        longitude : '80.13112306594849',
        maxWidth : 200
      },
      markers : [
        {
          latitude : '12.976299881670053',
          longitude : '80.13112306594849',
          title : 'first marker',
          click : function(recEvent) {
            console.log('Marker_1_click' + recEvent);
          },
          animation : 'DROP',
          timeout : 2000,
          draggable : true,
          infowindow : {
            content : '<div>Marker 1</div>'
          }
        },
        {
          latitude : '13.976299881670053',
          longitude : '80.13112306594849',
          title : 'first marker',
          click : function(recEvent) {
            console.log('Marker_2_Click' + recEvent);
          },
          animation : 'BOUNCE',
          timeout : 4000,
          draggable : false
        }
     ]
    }
});
