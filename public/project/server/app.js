module.exports = function(app) {
    var alertModel    = require("./models/alert.model.js")();
    var eventModel   = require("./models/event.model.js")();
    var expenseModel   = require("./models/expense.model.js")();
    var paymentRequestModel   = require("./models/paymentRequest.model.js")();
    var userModel   = require("./models/user.model.js")();
    var searchModel   = require("./models/search.model.js")();

    var alertService  = require("./services/alert.service.server.js")(app, alertModel);
    var eventService  = require("./services/event.service.server.js")(app, eventModel);
    var expenseService  = require("./services/expense.service.server.js")(app, expenseModel);
    var paymentRequestService  = require("./services/paymentRequest.service.server.js")(app, paymentRequestModel);
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var searchService = require("./services/search.service.server.js")(app,searchModel);
};