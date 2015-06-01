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
      var newState = this.set(index, value);

      replaceState( this, newState );
      
      return this;
    },

    deleteP: function( index ) {
      var newState = this.delete( index );

      replaceState( this, newState );

      return this;
    }
  };


  objectAssign( store, MutablePersistentMethods );
  forward( store, immutableListProperties, '__state' );
  forward( store, ['on'], '__eventEmitter' );

  return store;
};

function replaceState( store, newState ) {
  store.__state = newState;
  store.__eventEmitter.emit( store.CHANGED );
};