/**
 * Created by Tiffanys on 3/15/16.
 */
var mock = require("./form.mock.json");
module.exports = function(db,mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var Form = mongoose.model("Form", FormSchema);

    var api = {
        createForm: createForm,
        createFieldForForm: createFieldForForm,
        findAllForms : findAllForms,
        findAllFormsByUserId : findAllFormsByUserId,
        findFormById : findFormById,
        updateFormById : updateFormById,
        deleteFormById : deleteFormById
    };

    return api;

    function createForm(form) {
        return Form.create(form);
    }

    function createFieldForForm(formId, field) {
        field._id = "ID_" + (new Date()).getTime();
        for(var f in mock){
            if(mock[f]._id == formId){
                mock[f].fields.push(field);
                return mock[f];
            }
        }
        return null;
    }


    function findAllForms(){
        return Form.find();
    }

    function findFormById(id){
        return Form.findOne({_id : id});
    }

    function findAllFormsByUserId(userId){
        return Form.find({userId : userId});
    }

    function updateFormById(formId, form){
        return Form.findOneAndUpdate({_id:formId}, {$set:form});
    }

    function deleteFormById(formId){
        return Form
            .remove({_id: formId})
            .then (
                function () {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}