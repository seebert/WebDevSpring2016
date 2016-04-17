/**
 * Created by Tiffanys on 4/16/16.
 */
module.exports = function (mongoose) {
    var ExpenseSchema = require("./expense.schema.server.js")(mongoose);

    // use mongoose to declare a event schema
    var EventSchema = mongoose.Schema({
        title : String,
        description: String,
        adminId: mongoose.Schema.Types.ObjectId,
        expenses: [mongoose.Schema.Types.ObjectId]
    }, {collection: 'event'});
    return EventSchema;
};
