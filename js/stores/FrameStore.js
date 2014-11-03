var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var FrameConstants = require('../constants/FrameConstants');

var CHANGE_EVENT = 'change';

// Default frame (edge) size
var _size = 4;

var FrameStore = Object.assign(EventEmitter.prototype, {

  setSize: function (newSize) {
    _size = newSize;
  },

  getSize: function () {
    return _size;
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

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case FrameConstants.FRAME_SIZE_CHANGE:
      setSize(action.size);
      FrameStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

module.exports = FrameStore;
