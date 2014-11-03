var AppDispatcher = require('../dispatcher/AppDispatcher');
var TileConstants = require('../constants/TileConstants');

var TileActions = {

  /**
   * @param {number} id The id of the tile
   * @param {number} position New position
   */
  move: function(id, position) {
    AppDispatcher.handleViewAction({
      actionType: TileConstants.TILE_MOVE,
      id: id,
      position: position
    });
  }

};

module.exports = TileActions;
