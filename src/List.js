'use strict';

var Immutable = require( 'immutable' );

var ListStore = module.exports = function( iterable ) {
  var _list = Immutable.List( iterable );
  var store = {
    size: function() {
      return _list.setSize;
    },

    set: function( i, val ) {
      return _list.set( i, val );
    },

    delete: function( i ) {
      return _list.delete( i );
    },

    clear: function() {
      return _list.clear();
    },

    push: function( _values ) {
      return _list.push.apply( _list, arguments );
    },

    pop: function() {
      return _list.pop();
    },

    unshift: function( _values ) {
      return _list.unshift.apply( _list, arguments );
    },

    shift: function() {
      return _list.shift();
    },

    merge: function( _iterables ) {
      return _list.merge.apply( _list, arguments );
    },

    setSize: function( size ) {
      return _list.setSize( size );
    },

    setIn: function( keyPath, value ) {
      return _list.setIn( keyPath, value );
    },

    deleteIn: function( keyPath ) {
      return _list.deleteIn( keyPath );
    },

    toArray: function() {
      return _list.toArray();
    }
  };

  return store;
};