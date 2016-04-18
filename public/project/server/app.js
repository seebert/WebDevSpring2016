module.exports = function(app,db,  mongoose) {
    var alertModel    = require("./models/alert.model.js")(mongoose);
    var eventModel   = require("./models/event.model.js")(mongoose);
    var expenseModel   = require("./models/expense.model.js")(mongoose, eventModel);
    var paymentRequestModel   = require("./models/paymentRequest.model.js")(mongoose, expenseModel);
    var userModel   = require("./models/user.model.js")(mongoose);
    var searchModel   = require("./models/search.model.js")();

    var alertService  = require("./services/alert.service.server.js")(app, alertModel);
    var eventService  = require("./services/event.service.server.js")(app, eventModel);
    var expenseService  = require("./services/expense.service.server.js")(app, expenseModel, eventModel);
    var paymentRequestService  = require("./services/paymentRequest.service.server.js")(app, paymentRequestModel, expenseModel, eventModel);
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var searchService = require("./services/search.service.server.js")(app,searchModel);
};