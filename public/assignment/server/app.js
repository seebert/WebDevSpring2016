module.exports = function(app, db, mongoose) {
    var userModel    = require("./models/user.model.js")(db, mongoose);
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var adminService  = require("./services/admin.service.server.js")(app, userModel);

    var formModel   = require("./models/form.model.js")(db, mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldModel   = require("./models/field.model.js")(mongoose, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel, fieldModel);
};