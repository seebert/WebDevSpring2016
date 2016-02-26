/**
 * Created by Tiffanys on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var model = {
            forms : forms,
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;

        function createFormForUser(userId, form, callback){
            var newForm = {
                title: form.title,
                userId: userId,
                _id : (new Date).getTime()
            };
            model.forms.push(newForm);
            return callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var foundForms = [];

            for(var f in model.forms){
                if(model.forms[f].userId === userId){
                    foundForms.push(model.forms[f]);
                }
            }
            return callback(foundForms);
        }

        function deleteFormById(formId, callback){
            for(var f in model.forms){
                if(model.forms[f]._id === formId){
                    model.forms.splice(f,1);
                }
            }

            return callback(model.forms);
        }

        function updateFormById(formId, newForm, callback){
            for(var f in model.forms){
                if(model.forms[f]._id === formId){
                    model.forms[f].title = newForm.title;
                    return model.forms[f];
                }
            }

            return callback(null);
        }
    }
})();