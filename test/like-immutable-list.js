var assert = require( 'assert' );
var ListStore = require( '../src/List.js' );

var likeImmutablelist = module.exports = function() {
  it( 'sets the given iterable as the initial value', function() {
    var arr = [1,2,3];
    var listStore = ListStore(arr);

    console.log( listStore );

    assert.deepEqual( listStore.toArray(), arr );
  });

  describe( '#size()', function() {
    it( 'returns correct size', function() {
      var l1 = ListStore([1,2,3]);
      var l2 = ListStore();

      assert.equal( l1.size(), 3 );
      assert.equal( l2.size(), 0 );
    });
  });

  describe( '#set( index, value )', function() {
    it( 'returns a new List which includes `value` at `index`', function() {
      var arr = [1,2,3];
      var listStore = ListStore(arr);

      assert.deepEqual( listStore.set(0, 4).toArray(), [4,2,3]);
      assert.deepEqual( listStore.toArray(), arr );
    });
  });

  describe( '#delete( index )', function() {
    var arr;
    var listStore;

    beforeEach(function() {
      arr = [1, 2, 3, 4];
      listStore = ListStore( arr );
    });

    it( 'Returns a new List which excludes this `index`', function() {
      assert.deepEqual( listStore.delete(2).toArray(), [1,2,4]);
    });

    it( 'returns a new List with a size 1 less than this List', function() {
      assert.equal( listStore.delete(2).size, 3 );
    });

    it( 'leaves the store\'s list untouched', function() {
      listStore.delete(2);
      assert.deepEqual( listStore.toArray(), arr );
    });
  });

  describe( '#clear()', function() {
    var listStore;

    beforeEach(function(){
      listStore = ListStore([1,2,3,4]);
    });

    it( 'returns a new List with 0 size', function() {
      assert( listStore.size() > 0 );
      assert.equal( listStore.clear().size, 0 );
    });

    it( 'returns a list with no values', function() {
      assert.deepEqual( listStore.clear().toArray(), []);
    });
  });

  describe( '#push( ..values )', function() {
    it( 'returns a new list with provided values appended', function() {
      var listStore = ListStore();
      assert.deepEqual( listStore.push(1,2,3).toArray(), [1,2,3]);
    });

    it( 'appends the new values starting at the List\'s size', function() {
      var listStore = ListStore([1,2,3,4]);
      assert.deepEqual( listStore.push(5,6).toArray(), [1,2,3,4,5,6]);
    });

    it( 'the new list has the correct size', function() {
      assert.equal( ListStore().push(1,2,3).size, 3 );
    });
  });

  describe( '#pop()', function() {
    var listStore = ListStore([1,2,3]);

    it( 'returns a new list excluding the last index in this List', function() {
      assert.deepEqual( listStore.pop().toArray(), [1,2]);
    });

    it( 'returns a new List with a size one less than this List', function() {
      assert.equal( listStore.pop().size, listStore.size() - 1);
    });
  });

  describe( '#unshift( ..values )', function() {
    it( 'returns a new list with provided values prepended', function() {
      var listStore = ListStore();
      assert.deepEqual( listStore.unshift(1,2,3).toArray(), [1,2,3]);
    });

    it( 'shifts other values values to higher indices', function() {
      var listStore = ListStore([3,4,5,6]);
      assert.deepEqual( listStore.unshift(1,2).toArray(), [1,2,3,4,5,6]);
    });

    it( 'the new list has the correct size', function() {
      assert.equal( ListStore().unshift(1,2,3).size, 3 );
    });
  });

  describe( '#shift()', function() {
    it( 'returns a new List with a size ones less than this List', function() {
      assert.equal( ListStore([1,2,3]).shift().size, 2);
    });

    it( 'shifts all other values to a lower index', function() {
      assert.deepEqual( ListStore([1,2,3]).shift().toArray(), [2,3]);
    });
  });

  describe( '#update()', function() {
    it( 'returns a new List with an updated value at index with the return'+
      ' value of calling updater with the existing value' );

    it( 'returns `notSetvalue` if `index` was not set' );
  });

  describe( '#merge( ..iterables )', function() {
    it( 'returns a new List resulting from merging the provided iterables'+
      ' into this List', function() {
      var listStore = ListStore([1,2,3,4,5]);

      assert.deepEqual( listStore.merge([3,7,8], [6]).toArray(), [6,7,8,4,5]);
    });
  });

  describe( '#setSize( size )', function() {
    it( 'returns a new List with size `size`', function() {
      assert.equal( ListStore().setSize(5).size, 5 );
    });

    describe( 'when `size` is less than this List\'s size', function() {
      it( 'returns a new List excluding values at higher indices', function() {
        var list = ListStore([1,2,3,4,5]).setSize(3);
        assert.deepEqual( list.toArray(), [1,2,3]);
      });
    });

    describe( 'when `size` is greater than this List\'s size', function() {
      it( 'returns a new List that has undefined values for the newly'+
        ' available indices', function() {
        var list = ListStore([1,2]).setSize(4);
        assert.deepEqual( list.toArray(), [1,2,undefined,undefined]);
      });
    });
  });

  describe( '#setIn( keyPath, value )', function() {
    it( 'returns a new List having set `value` at this `keyPath`', function() {
      var list = ListStore([1,2,3,4]);

      assert.deepEqual( list.setIn([0], 3).toArray(), [3,2,3,4] );
    });

    describe( 'if any keys in `keyPath` do not exist', function() {
      it( 'creates a new immutable Map at that key' );
    });
  });

  describe( '#deleteIn( keyPath )', function() {
    it( 'returns a new List having removed the value at `keyPath`', function() {
      var list = ListStore([1,2,3,4]);

      assert.deepEqual( list.deleteIn([1]).toArray(), [1,3,4] );
    });

    it( 'returns an equal list if the keys in `keyPath` do not exist', function() {
      var list = ListStore([1,2,3,4]);

      assert.deepEqual( list.deleteIn([5]).toArray(), list.toArray() );
    });
  });
};