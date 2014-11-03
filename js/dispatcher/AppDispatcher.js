var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = Object.assign(new Dispatcher(), {

  handleViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;
