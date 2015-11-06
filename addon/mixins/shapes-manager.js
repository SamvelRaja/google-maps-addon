import Ember from 'ember';

import diffObjects from '../helpers/diff-objects';
import assertKeyExists from '../helpers/assert-key-exists';

import mouseEvents from '../mouse-events';

import Marker from '../shapes/marker';

const MARKER_CLASS_MAP = {
  "markers": Marker
};

export default Ember.Mixin.create({
  setupShapes: Ember.on("init", function() {
    this.set("shapes", {
      markers: {},
      // circles: {},
      // polygons: {},
      // rectangles: {}
    });
  }),

  forEachShapeType(callback) {
    let shapes = this.get("shapes");

    Object.keys(shapes).forEach((key) => {
      callback(key, shapes[key]);
    });
  },

  drawAllMarkers() {
    this.forEachShapeType((typeName, oldShapes) => {
      this.drawAllShapes(typeName, oldShapes, MARKER_CLASS_MAP[typeName]);
    });
  },

  drawAllShapes(typeName, shapes, shapeClass) {
    let newShapeOptions = this.owner.get(typeName);
    assertKeyExists(newShapeOptions, typeName);

    let newShapesObject = {};
    newShapeOptions.forEach((shape) => {
      newShapesObject[shape.key] = shape;
    });

    let mapElement = this.get('map');

    let shapeOperations = diffObjects(newShapesObject, shapes);

    shapeOperations.added.forEach((shapeAttributes) => {
      let shape = new shapeClass;
      shape.build(mapElement, shapeAttributes);
      shape.setup(shapeAttributes);

      shapes[shapeAttributes.key] = shape;
    });

    shapeOperations.updated.forEach((operation) => {
      operation.object.setup(operation.attributes);
    });

    shapeOperations.removed.forEach((operation) => {
      operation.object.remove();
      delete shapes[operation.key];
    });
  }
});
