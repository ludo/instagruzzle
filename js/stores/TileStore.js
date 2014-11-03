var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TileConstants = require('../constants/TileConstants');

var CHANGE_EVENT = 'change';

var _tiles = [];

/**
 * Create a Tile item.
 * @param  {number} id
 */
function create(id) {
  _tiles.push({
    id: id
  });
}

var TileStore = Object.assign(EventEmitter.prototype, {

  /**
   * Get the entire collection of Tiles.
   * @return {array}
   */
  getAll: function () {
    return _tiles;
  },

  /**
   * Tests whether the puzzle is solved
   * @return {boolean}
   */
  isSolved: function () {
    // TODO Implement
    return false;
  },

  /**
   * Load a bunch (count) tiles
   * @param {number} count Number of tiles to be created
   */
  seed: function (count) {
    for (var i = 0; i < count; i++) {
      create(i);
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case TileConstants.TILE_SWAP:
      swap(action.id1, action.id2);
      TileStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = TileStore;
