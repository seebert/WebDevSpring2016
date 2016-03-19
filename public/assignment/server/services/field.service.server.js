/**
 * Created by Tiffanys on 3/18/16.
 */

module.exports = function(app, formModel) {

    app.get('/api/assignment/form/:formId/field',getAllFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', getFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);

    app.post('/api/assignment/form/:formId/field',createField);
    /* TODO: The id of the new form field should be set dynamically using Node.js guid or node-uuid libraries.*/

    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);

    function createField(req, res){
        var formId = req.params.formId;
        var field = req.body;
        var updatedForm = formModel.createFieldForForm(formId, field);

        res.json(updatedForm);
    }

    // returns an array of fields belonging to a form object whose id is equal to the formId path parameter
    function getAllFieldsByFormId(req, res){
        var formId = req.params.formId;
        var fields = formModel.findFormById(formId).fields;
        res.json(fields);
    }

    // returns a field object whose id is equal to the fieldId path parameter
    // and belonging to a form object whose id is equal to the formId path parameter
    function getFieldById(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.findFormById(formId).fields;

        for (var f in fields){
            if(fields[f]._id === fieldId){
                res.json(fields[f]);
            }
        }

        return null;
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var updatedField = formModel.updateField(formId, fieldId,field);

        res.json(updatedField);
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);

        for(var f in form.fields){
            if(fields(f)._id === fieldId){
                form.fields.splice(f, 1);
            }
        }

        formModel.updateFormById(formId, form);
        res.json(null);
    }

}