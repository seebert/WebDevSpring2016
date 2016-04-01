/**
 * Created by Tiffanys on 3/31/16.
 */

module.exports = function(mongoose, formModel) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var Field = mongoose.model("Field", FieldSchema);
    var Form = formModel.getMongooseModel();

    var api = {
        createField: createField,
        findFieldById: findFieldById,
        findFieldByForm : findFieldByForm,
        updateField : updateField,
        deleteFieldById : deleteFieldById
    };

    return api;

    function createField(formId, field) {
        return Form.findById(formId)
            .then(function(form){
                form.fields.push(field);
                return form.save();
            })
    }

    function findFieldById(id){
        return Field.findById(id);
    }


    function findFieldByForm(formId){
        return Form.findById(formId).select("fields");
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