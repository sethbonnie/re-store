'use strict';

var Immutable = require( 'immutable' );
var objectAssign = require( 'object-assign' );
var forward = require( 'forward-props' );
var listAllProps = require( 'list-all-props' );

var ListStore = module.exports = function( iterable ) {
  var store = {
    __state: Immutable.List(iterable),
    __subscribers: Immutable.Map(),
    __history: Immutable.List()
  };

  var immutableListProperties = listAllProps( store.__state ).filter(
      function( prop ) {
        // filter out all private methods
        return /^[a-zA-Z]/.test(prop);
      }
    );

  var MutablePersistentMethods = {
    setP: function (index, value) {
      var temp = this.set(index, value);
      // add temp to history

      // create new current state
      this.__state = temp;
      
      return this;
    }
  };


  objectAssign( store, MutablePersistentMethods );
  forward( store, immutableListProperties, '__state' );

  return store;
};