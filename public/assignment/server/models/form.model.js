/**
 * Created by Tiffanys on 3/15/16.
 */

var mock = require("./form.mock.json");
module.exports = function(app, db) {
    var api = {
        createForm: createForm,
        createFieldForForm: createFieldForForm,
        findAllForms : findAllForms,
        findAllFormsByUserId : findAllFormsByUserId,
        findFormById : findFormById,
        findFormByTitle : findFormByTitle,
        updateForm : updateForm,
        updateField : updateField,
        deleteFormById : deleteFormById
    };

    return api;


    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
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
        return mock;
    }

    function findFormById(id){
        for (var u in mock) {
            if (mock[u]._id == id) {
                return mock[u];
            }
        }

        return null;
    }

    function findAllFormsByUserId(userId){
        var forms = [];

        for (var u in mock) {
            if (mock[u].userId == userId) {
                forms.push(mock[u]);
            }
        }

        return forms;
    }

    function findFormByTitle(title){
        for (var u in mock) {
            if (mock[u].title == title) {
                return mock[u];
            }
        }
        return null;
    }

    function updateForm(formId, form){
        for (var u in mock) {
            if (mock[u]._id == formId) {
                mock[u].title = form.title;
                mock[u].userId = form.userId;
                mock[u].fields = form.fields;
                return mock[u];
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field){
        for (var u in mock) {
            if (mock[u]._id == formId) {
                for(var f in mock[u].fields){
                    if(mock[u].fields[f]._id == fieldId){
                        mock[u].fields[f].label = field.label;
                        mock[u].fields[f].type = field.type;
                        mock[u].fields[f].placeholder = field.placeholder;

                        return mock[u].fields[f];
                    }
                }
            }
        }
        return null;
    }
    function deleteFormById(formId){
        for (var u in mock) {
            if (mock[u]._id == formId) {
                mock.splice(u, 1);
            }
        }
        return mock;
    }
}