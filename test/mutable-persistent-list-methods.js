var assert = require( 'assert' );
var ListStore = require( '../src/List' );

// Silence Immutable's warnings about Arrays
console.warn = undefined;

var mutablePersistentListMethods = module.exports = function() {
  describe( '#setP( index, value )', function() {

    describe( 'when index exists', function() {
      var store;

      beforeEach( function() {
        store = ListStore([1,2,3]);
      });

      it( 'modifies the value at the given index', function() {
        store.setP( 1, 8 );
        assert.equal( store.get( 1 ), 8 );
      });

      it( 'has the same size', function() {
        assert.equal( store.size(), 3 );
      });
    });

    describe( 'when index does not exist', function() {
      var index = 5;
      var store;

      before( function() {
        store = ListStore([1,2,3]);
        store.setP( index, 8 );
      });

      it( 'mutates into a new List with a the value inserted at' +
        ' the given', function() {
        assert.equal( store.get(index), 8 );
      });

      it( 'has a size equal to the given index + 1', function() {
        assert.equal( store.size(), index + 1 );
      });
    });

    it(  'emits a store.CHANGED event', function( done ) {
      var store = ListStore();
      store.on( store.CHANGED, function() {
        done();
      });

      // This call should trigger it
      store.setP( 1, 2 );
    });
  });

  describe( '#deleteP( index )', function() {
    it( 'mutates into a new List with index removed', function() {
      var store = ListStore([1,2,3,4]);
      store.deleteP(2);
      assert.deepEqual( store.toArray(), [1,2,4] );
    });

    it( 'shifts higher indices down', function() {
      var store = ListStore([1,2,3,4]);
      store.deleteP(2);
      assert.equal( store.get(2), 4 );
    });

    it( 'has a size 1 less than the previous state', function() {
      var store = ListStore([1,2,3,4]);
      var originalSize = store.size();
      store.deleteP(2);

      assert.equal( store.size(), originalSize - 1);
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore();
      store.on( store.CHANGED, function() {
        done();
      });

      // This call should trigger it
      store.deleteP(2);
    });
  });

  describe( '#clearP()', function() {
    it( 'mutates into a new List with 0 size', function() {
      var store = ListStore([1,2,3,4]);

      assert( store.size() > 0 );
      store.clearP();
      assert.equal( store.size() , 0 );
    });

    it( 'removes all elements from the List', function() {
      var store = ListStore([1,2,3,4]);
      assert( store.get(0) );
      store.clearP();
      assert( !store.get(0) );
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore();
      store.on( store.CHANGED, function() {
        done();
      });

      // This call should trigger it
      store.clearP();
    });
  });

  describe( '#pushP( ...values )', function() {
    it( 'mutates into a new List with the provided values appended', function() {
      var store = ListStore();
      store.pushP(1,2,3,4);
      assert.deepEqual( store.toArray(), [1,2,3,4] );
    });

    it( 'appends the new values starting at the List\'s size', function() {
      var store = ListStore([1,2,3,4]);
      store.pushP(5,6,7);
      assert.deepEqual( store.toArray(), [1,2,3,4,5,6,7] );
    });

    it( 'has a size equal to previous state + size of added values', function() {
      var store = ListStore();
      var originalSize = store.size();
      store.pushP(1,2,3,4);
      assert.equal( store.size(), originalSize + 4 );
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore();
      store.on( store.CHANGED, function() {
        done();
      });

      // This call should trigger it
      store.pushP();
    });

    it( 'does not emit a store.CHANGED event if called with no args' );
  });

  describe( '#popP()', function() {
    it( 'mutates into a new List excluding the last index in the' +
      ' previous state' );

    it( 'has a size 1 less than the previous state' );

    it( 'emits a store.CHANGED event' );
  });

  describe( 'unshiftP( ...values )', function() {

    it( 'mutates into a new List with provided values prepended' );

    it( 'shifts other values to higher indices' );

    it( 'has a size equal to previous state + size of added values' );

    it( 'emits a store.CHANGED event' );
  });

  describe( 'shiftP()', function() {

    it( 'mutates into a new List excluding the first index in the' +
      ' previous state' );

    it( 'has a size 1 less than the previous state' );

    it( 'shifts all other values to a lower index' );

    it( 'emits a store.CHANGED event' );
  });

  describe( 'setSizeP( size )', function() {
    describe( 'when size is less than previous state\'s size', function() {
      it( 'mutates into a new list excluding values at higher indices' );
    });

    describe( 'when size is greater than previous state\'s size', function() {
      it( 'mutates into a new List that has undefined values for' +
        ' the newly available indices' );
    });

    it( 'mutates into a new List with the given size' );

    it( 'emits a store.CHANGED event' );
  });

  describe( 'setInP( keyPath, value', function() {

    describe( 'when a key in keyPath does not exist', function() {
      it( 'creates a new Immutable Map at that key' );
    });

    it( 'mutates into a new List having set value at given keyPath' );

    it( 'emits a store.CHANGED event' );
  });

  describe( 'deleteInP( keyPath )', function() {

    it( 'mutates into a new List having removed the value at keyPath' );

    it( 'returns an equal List if the keys in keyPath do not exist');

    it( 'emits a store.CHANGED event' );
  });
};