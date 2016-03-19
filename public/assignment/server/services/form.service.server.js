/**
 * Created by Tiffanys on 3/18/16.
 */
module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', getFormsFromUserId);
    app.get('/api/assignment/form/:formId', getFormById);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    /* TODO: The form object's id is initially null since it is a new record.
        The id of the new form should be set dynamically using Node.js guid or node-uuid libraries.*/
    app.put('/api/assignment/form/:formId',updateForm);

    function getFormsFromUserId(req, res){
        var userId = req.params.userId;
        var forms = formModel.findAllFormsByUserId(userId);

        res.json(forms);
    }

    function updateForm(req,res){
        var form = req.body;
        var formId = req.params.formId;
        var updatedForm = formModel.updateFormById(formId, form);

        res.json(updatedForm);
    }

    function createForm(req,res){
        console.log(req.body);
        var form = req.body;
        form.userId = req.params.userId;
        var newForm = formModel.createForm(form);

        res.json(newForm);
    }

    function getFormById(req, res){
        var id = req.params.formId;
        var form = formModel.findFormById(id);

        res.json(form);
    }

    function deleteForm(req, res){
        var id = req.params.formId;
        var forms = formModel.deleteFormById(id);

        res.json(forms);

    }

    function updateForm(req, res){

    }
}