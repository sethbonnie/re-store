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
    },

    clearP: function() {
      var newState = this.clear();

      replaceState( this, newState );

      return this;
    },

    pushP: function( _values ) {
      var newState = this.push.apply( this.__state, arguments );

      replaceState( this, newState );

      return this;
    },

    popP: function() {
      var newState = this.pop();

      replaceState( this, newState );

      return this;
    },

    unshiftP: function() {
      var newState = this.unshift.apply( this.__state, arguments );
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