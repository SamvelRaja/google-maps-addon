import Ember from 'ember';

import diffObjectOperations from '../helpers/diff-objects-operations';
import assertKeyExists from '../helpers/assert-key-exists';

import Marker from '../shapes/marker';
import Circle from '../shapes/circle';
import Rectangle from '../shapes/rectangle';
import InfoWindow from '../shapes/info-window';
import Polygon from '../shapes/polygon';

const SHAPE_CLASS_MAP = {
  "markers": Marker,
  "circles": Circle,
  "rectangles": Rectangle,
  "infoWindows": InfoWindow,
  "polygons": Polygon
};

export default Ember.Mixin.create({
  setupShapes: Ember.on("init", function() {
    this.set("shapes", {
      markers: {},
      circles: {},
      rectangles: {},
      infoWindows: {},
      polygons: {}
    });
  }),

  forEachShapeType(callback) {
    let shapes = this.get("shapes");

    Object.keys(shapes).forEach((key) => {
      callback(key, shapes[key]);
    });
  },

  drawAllShapes() {
    this.forEachShapeType((typeName, oldShapes) => {
      this.drawShapeForType(typeName, oldShapes, SHAPE_CLASS_MAP[typeName]);
    });
  },

  drawShapeForType(typeName, shapes, ShapeClass) {
    let newShapeOptions = this.owner.get(typeName) || [];
    assertKeyExists(newShapeOptions, typeName);

    let newShapesObject = {};
    newShapeOptions.forEach((shape) => {
      newShapesObject[shape.key] = shape;
    });

    let mapElement = this.get('map');

    let shapeOperations = diffObjectOperations(newShapesObject, shapes);

    shapeOperations.added.forEach((attributes) => {
      let shape = new ShapeClass();
      shape.set('options', attributes);
      shape.set('mapElement', mapElement);

      shape.update();
      shape.addToMapWithTimeout();

      shapes[attributes.key] = shape;
    });

    shapeOperations.updated.forEach((operation) => {
      operation.object.set('options', operation.attributes);
      operation.object.update();
    });

    shapeOperations.removed.forEach((operation) => {
      operation.object.remove();
      delete shapes[operation.key];
    });
  }
});
