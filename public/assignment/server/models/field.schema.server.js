/**
 * Created by Tiffanys on 3/30/16.
 */
module.exports = function (mongoose) {
    //Enum for field's type
    var FIELD_TYPE = {
        TEXT : "TEXT",
        EMAIL : "EMAIL",
        PASSWORD : "PASSWORD",
        OPTIONS : "OPTIONS",
        DATE : "DATE",
        RADIOS : "RADIOS",
        CHECKBOXES : "CHECKBOXES"
    };

    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: FIELD_TYPE,
        placeholder: String,
        options: [{label:STRING, value:STRING}]
    }, {collection: 'field'});
    return FieldSchema;
};