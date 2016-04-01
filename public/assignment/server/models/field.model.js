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
        deleteField : deleteField
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

    function updateField(formId, fieldId, fieldObj){
        return Form.findById(formId)
            .then(function(form){
                var field = form.fields.id(fieldId);

                if(fieldObj.label)
                    field.label = fieldObj.label;

                if(fieldObj.type)
                    field.type = fieldObj.type;

                if(fieldObj.placeholder)
                    field.placeholder = fieldObj.placeholder;

                if(fieldObj.options){
                    var updateOptions = [];
                    var options = fieldObj.options.split("\n");
                    for(var o in options) {
                        var label_value_pairs = options[o].split(";");
                        updateOptions.push({"label": label_value_pairs[0], "value": label_value_pairs[1]});
                    }
                    field.options = updateOptions;
                }

                return form.save();
            });
    }

    function deleteField(formId, fieldId){
        return Form
        .findById(formId)
        .then(
            function(form){
                form.fields.id(fieldId).remove();
                return form.save();
            }
        );
    }
}