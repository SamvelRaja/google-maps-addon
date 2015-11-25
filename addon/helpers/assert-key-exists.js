import Ember from 'ember';

function assertKeyExists(arrayOfObjects, name) {
  arrayOfObjects.forEach((object) => {
    Ember.assert('A `key` attribute must be provided for all `google-maps-addon` ' + name, !!object.key);
  });
}

export default assertKeyExists;
