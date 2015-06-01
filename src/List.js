'use strict';

var EventEmitter = require( 'events' ).EventEmitter;
var Immutable = require( 'immutable' );
var objectAssign = require( 'object-assign' );
var forward = require( 'forward-props' );
var listAllProps = require( 'list-all-props' );

var ListStore = module.exports = function( iterable ) {
  var store = {
    __state: Immutable.List(iterable),
    __eventEmitter: new EventEmitter(),
    __history: Immutable.List(),
    CHANGED: '__CHANGED__'
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
      this.__eventEmitter.emit( this.CHANGED );
      // add temp to history

      // create new current state
      this.__state = temp;
      
      return this;
    }
  };


  objectAssign( store, MutablePersistentMethods );
  forward( store, immutableListProperties, '__state' );
  forward( store, ['on'], '__eventEmitter' );

  return store;
};