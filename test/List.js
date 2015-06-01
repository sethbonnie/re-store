var likeImmutableList = require( './like-immutable-list' );
var mutablePersistentListMethods = require( './mutable-persistent-list-methods' );
var historyMethods = require( './history-methods' );

describe( 'Restore.ListStore()', function() {

  describe( 'behaves like an Immutable.List', likeImmutableList );

  describe( 'Mutable Persistent List Methods', mutablePersistentListMethods );

  //describe( 'History', historyMethods.bind(null, ListStore) );
});