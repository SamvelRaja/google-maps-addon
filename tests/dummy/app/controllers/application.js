import Ember from 'ember';

export default Ember.Controller.extend({
  inputObj: {
      latitude : '12.976299881670053',
      longitude : '80.13112306594849',
      zoom : 7,
      click : function(rec_event) {
        console.log('map_click' + rec_event);
      },
      dblclick : function(rec_event) {
        console.log('map_double_click' + rec_event);
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
      mousemove : function(rec_event) {
        console.log('map_mousemove' + rec_event);
      },
      mouseout : function(rec_event) {
        console.log('map_mouseout' + rec_event);
      },
      mouseover : function(rec_event) {
        console.log('map_mouseover' + rec_event);
      },
      rightclick : function(rec_event) {
        console.log('map_rightclick' + rec_event);
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
          click : function(rec_event) {
            console.log('Marker_1_click' + rec_event);
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
          click : function(rec_event) {
            console.log('Marker_2_Click' + rec_event);
          },
          animation : 'BOUNCE',
          timeout : 4000,
          draggable : false
        }
     ]
    }
});
