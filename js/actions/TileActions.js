var AppDispatcher = require('../dispatcher/AppDispatcher');
var TileConstants = require('../constants/TileConstants');

var TileActions = {

  move: function (id) {
    AppDispatcher.handleViewAction({
      actionType: TileConstants.TILE_MOVE,
      id: id
    });
  },

  shuffle: function () {
    AppDispatcher.handleViewAction({
      actionType: TileConstants.TILE_SHUFFLE
    });
  }

};

module.exports = TileActions;
