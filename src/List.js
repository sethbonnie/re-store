'use strict';

var Immutable = require( 'immutable' );
var assign = require( 'object-assign' );

var ListStore = module.exports = function( iterable ) {
  var store = Immutable.List( iterable )

  return store;
};