/**
@method diffMarkers
@param newObjects
@param oldObjects
@usage
  Diff a new set of objects to and old set of objects. For it to work it assumes that each object has a `googleMapsAddonKey` property set corresponding to a `key` attribute on the new objects.
**/

function diffObjects(newObjects, oldObjects) {
  var objectOperations = {
    added: [],
    removed: [],
    updated: []
  };

  var objectsLeft = cloneObject(oldObjects);

  // If old objects are present, figure out which are new and old and removed
  if (oldObjects) {
    iterateObject(newObjects, (key, attributes) => {
      if (oldObjects[key]) {
        let object = oldObjects[key];
        objectOperations.updated.push({ attributes, object });
      } else {
        objectOperations.added.push(attributes);
      }

      delete objectsLeft[key];
    });

    iterateObject(objectsLeft, (key, object) => {
      objectOperations.removed.push({ object, key });
    });
  // No old objects were present, all are new
  } else {
    iterateObject(objectsLeft, (key, attributes) => {
      objectOperations.push(attributes)
    });
  }

  return objectOperations;
}

function iterateObject(object, callback) {
  Object.keys(object).forEach((key) => {
    callback(key, object[key]);
  });
}

function cloneObject(object) {
  var cloned = {};
  iterateObject(object, (key, value) => {
    cloned[key] = value;
  });
  return cloned;
}

export default diffObjects;
