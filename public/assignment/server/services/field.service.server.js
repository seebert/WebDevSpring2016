/**
 * Created by Tiffanys on 3/18/16.
 */

module.exports = function (app, formModel, fieldModel) {
    app.post('/api/assignment/form/:formId/field', createField);
    app.get('/api/assignment/form/:formId/field', getAllFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', getFieldById);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel
            .createField(field)
            .then(
                function (field) {
                    formModel
                        .updateFormFields(formId, field)
                        .then(function (field) {
                                res.json(field);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        fieldModel
            .findFieldByForm(formId)
            .then(
                function (fields) {
                    res.json(fields.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = fieldModel.findFieldById(formId, fieldId);

        for (var f in fields) {
            if (fields[f]._id === fieldId) {
                res.json(fields[f]);
            }
        }

        return null;
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var updatedField = formModel.updateField(formId, fieldId, field);

        res.json(updatedField);
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);

        for (var f in form.fields) {
            if (fields(f)._id === fieldId) {
                form.fields.splice(f, 1);
            }
        }

        formModel.updateFormById(formId, form);
        res.json(null);
    }

}