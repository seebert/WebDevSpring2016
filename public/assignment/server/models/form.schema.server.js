/**
 * Created by Tiffanys on 3/30/16.
 */
module.exports = function (mongoose) {
    var FieldSchema = require("./field.schema.server.js")();

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: "New Form"},
        fields: [FieldSchema],
        created: {type: Date, default : new Date()},
        updated: {type: Date, default : new Date()}
    }, {collection: 'form'});
    return FormSchema;
};