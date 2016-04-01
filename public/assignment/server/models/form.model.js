/**
 * Created by Tiffanys on 3/15/16.
 */
module.exports = function(db,mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var Form = mongoose.model("Form", FormSchema);

    var api = {
        createForm: createForm,
        findAllForms : findAllForms,
        findAllFormsByUserId : findAllFormsByUserId,
        findFormById : findFormById,
        updateFormById : updateFormById,
        updateFormFields : updateFormFields,
        deleteFormById : deleteFormById,
        getMongooseModel: getMongooseModel
    };

    return api;

    function getMongooseModel(){
        return Form;
    }

    function createForm(form) {
        return Form.create(form);
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

    function updateFormFields(formId, field){
        return Form.findByIdAndUpdate(
            {_id:formId},
            {$push: {"fields" : field}}
        )
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