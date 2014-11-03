var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var FrameStore = require('../stores/FrameStore.js');
var TileConstants = require('../constants/TileConstants');

var CHANGE_EVENT = 'change';

var _tiles = [];

/**
 * Create a Tile item.
 * @param  {number} id
 */
function create(id) {
  _tiles.push(id);
}

/**
 * Try to move a Tile to a new position.
 *
 * Should move to the 'missing' position if wihin reach or fail if no room to
 * move.
 * @param {number} id Tile id
 */
function move(id) {
  var frameSize = FrameStore.getSize();
  var maxId = (frameSize * frameSize) - 1;
  var movements = [-frameSize, -1, 1, frameSize];
  var idxOfClicked = _tiles.indexOf(id);
  var idxOfMissing = _tiles.indexOf(maxId)

  // Valid move?
  if (movements.indexOf(idxOfClicked - idxOfMissing) >= 0) {
    _tiles[idxOfMissing] = id;
    _tiles[idxOfClicked] = maxId;
  }
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

  switch (action.actionType) {
    case TileConstants.TILE_MOVE:
      move(action.id);
      break;

    case TileConstants.TILE_SHUFFLE:
      shuffle();
      break;

    default:
      return true;
  }

  TileStore.emitChange();

  return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = TileStore;
