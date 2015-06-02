var assert = require( 'assert' );
var ListStore = require( '../src/List' );
var Map = require( 'immutable' ).Map;

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
      ' previous state', function() {
      var store = ListStore([1,2,3,4]);
      store.popP()
      assert.deepEqual( store.toArray(), [1,2,3] ); 
    });

    it( 'has a size 1 less than the previous state', function() {
      var store = ListStore([1,2,3,4]);
      var originalSize = store.size();
      store.popP();
      assert.equal( store.size(), originalSize - 1 );
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore([1,2,3,4]);
      store.on( store.CHANGED, function() {
        done();
      });

      // This call should trigger it
      store.popP();
    });

    it( 'does not emit a store.CHANGED event when store is empty' );
  });

  describe( 'unshiftP( ...values )', function() {

    it( 'mutates into a new List with provided values prepended', function() {
      var store = ListStore([5,6]);
      store.unshiftP(1,2,3,4);
      assert.deepEqual( store.toArray(), [1,2,3,4,5,6] );
    });

    it( 'shifts other values to higher indices', function() {
      var store = ListStore([1,2,3]);
      store.unshiftP(-1, 0);
      assert.equal( store.get(4), 3 );
    });

    it( 'has a size equal to previous state + size of added values', function() {
      var store = ListStore([3,4]);
      var originalSize = store.size();
      store.unshiftP(1,2);
      assert.equal( store.size(), originalSize + 2 );
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore([3,4]);
      store.on( store.CHANGED, function() {
        done();
      });

      store.unshiftP(1,2);
    });
  });

  describe( 'shiftP()', function() {

    it( 'mutates into a new List excluding the first index in the' +
      ' previous state', function() {
      var store = ListStore([1,2,3,4]);
      store.shiftP();
      assert.deepEqual( store.toArray(), [2,3,4] );
    });

    it( 'has a size 1 less than the previous state', function() {
      var store = ListStore([1,2,3,4]);
      var originalSize = store.size();
      store.shiftP();
      assert.equal( store.size(), originalSize - 1 );
    });

    it( 'shifts all other values to a lower index', function() {
      var store = ListStore([1,2,3,4]);
      store.shiftP();
      assert.equal( store.get(0), 2 );
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore([1,2]);
      store.on( store.CHANGED, function() {
        done();
      });
      store.shiftP();
    });
  });

  describe( 'setSizeP( size )', function() {
    describe( 'when size is less than previous state\'s size', function() {
      it( 'mutates into a new list excluding values at higher indices', function() {
        var store = ListStore([1,2,3,4]);
        store.setSizeP(3);
        assert.equal( store.size(), 3 );
        assert.strictEqual( store.get(3, null), null );
      });
    });

    describe( 'when size is greater than previous state\'s size', function() {
      it( 'mutates into a new List that has undefined values for' +
        ' the newly available indices', function() {
        var store = ListStore([1,2,3]);
        store.setSizeP( 4 );
        assert.equal( store.size(), 4 );
        assert.strictEqual( store.get(3, true), undefined );
      });
    });

    it( 'mutates into a new List with the given size', function() {
      var store = ListStore();
      store.setSizeP( 4 );
      assert.equal( store.size(), 4 );
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore();
      store.on( store.CHANGED, function() {
        done();
      });
      store.setSizeP(4);
    });

    it( 'does not emit a store.CHNAGED event when the given size is equal' +
        ' to the current size or undefined' );
  });

  describe( 'setInP( keyPath, value )', function() {

    describe( 'when a key in keyPath does not exist', function() {
      it( 'creates a new Immutable Map at that key', function() {
        var store = ListStore();
        store.setInP( [0, 1], 'deeper value' );
        assert( Map.isMap( store.get(0) ) );
      });
    });

    it( 'mutates into a new List having set value at given keyPath', function() {
      var store = ListStore();
      store.setInP( [0], 'wonderful' );
      assert.equal( store.get(0), 'wonderful' );
    });

    it( 'emits a store.CHANGED event', function( done ) {
      var store = ListStore();
      store.on( store.CHANGED, function() {
        assert.equal( store.get(0), 'abc' );
        done();
      });
      store.setInP( [0], 'abc' );
    });
  });

  describe( 'deleteInP( keyPath )', function() {

    it( 'mutates into a new List having removed the value at keyPath' );

    it( 'returns an equal List if the keys in keyPath do not exist');

    it( 'emits a store.CHANGED event' );
  });
};