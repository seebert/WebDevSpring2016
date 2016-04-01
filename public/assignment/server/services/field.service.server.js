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
            .createField(formId, field)
            .then(
                function (field) {
                    res.json(field);
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
        fieldModel
            .findFieldById(formId, fieldId)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel
            .updateField(formId, fieldId, field)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteField(formId, fieldId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

}