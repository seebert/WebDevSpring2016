/**
 * Created by Tiffanys on 3/30/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type:
            {type : String,
             enum: [ "TEXT", "EMAIL", "PASSWORD","OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
        placeholder: String,
        options: [{label:String, value:String}]
    }, {collection: 'field'});
    return FieldSchema;
};