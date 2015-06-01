var likeImmutableList = require( './like-immutable-list' );
var mutablePersistentListMethods = require( './mutable-persistent-list-methods' );
var persistentMethodEvents = require( './persistent-method-events' );

describe( 'Restore.ListStore()', function() {

  describe( 'behaves like an Immutable.List', likeImmutableList );

  describe( 'Mutable Persistent List Methods', mutablePersistentListMethods );
});