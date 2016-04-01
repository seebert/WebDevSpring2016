/**
 * Created by Tiffanys on 3/31/16.
 */

module.exports = function(db,mongoose) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var Field = mongoose.model("Field", FieldSchema);

    var api = {
        createField: createField,
        findFieldById: findFieldById,
        updateField : updateField,
        deleteFieldById : deleteFieldById
    };

    return api;

    function createField(field) {
        return Field.create(field);
    }

    function findFieldById(id){

    }
    function updateField(formId, fieldId, field){
        for (var u in mock) {
            if (mock[u]._id == formId) {
                for(var f in mock[u].fields){
                    if(mock[u].fields[f]._id == fieldId){
                        if(field.label)
                            mock[u].fields[f].label = field.label;

                        if(field.type)
                            mock[u].fields[f].type = field.type;

                        if(field.placeholder)
                            mock[u].fields[f].placeholder = field.placeholder;

                        if(field.options){
                            var updateOptions = [];
                            var options = field.options.split("\n");
                            for(var o in options) {
                                var label_value_pairs = options[o].split(";");
                                updateOptions.push({"label": label_value_pairs[0], "value": label_value_pairs[1]});
                            }
                            mock[u].fields[f].options = updateOptions;
                        }

                        return mock[u].fields[f];
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldById(){
    }
}