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

  // If old objects are present, figure out which are new and old and removed
  if (oldObjects) {
    var oldObjectsByKey = {};
    oldObjects.forEach((object) => {
      oldObjectsByKey[object.googleMapsAddonKey] = object;
    });

    newObjects.forEach((objectOption) => {
      if (oldObjectsByKey[objectOption.key]) {
        let object = oldObjectsByKey[objectOption.key];
        objectOperations.updated.push({ objectOption, object });

        delete oldObjectsByKey[objectOption.key];
      } else {
        objectOperations.added.push(objectOption);
      }
    });

    Object.keys(oldObjectsByKey).forEach((key) => {
      let object = oldObjectsByKey[key];
      objectOperations.removed.push({ object });
    });
  // No old objects were present, all are new
  } else {
    objectOperations.added = newObjects;
  }

  return objectOperations;
}

export default diffObjects;
