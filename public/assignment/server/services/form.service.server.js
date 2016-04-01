/**
 * Created by Tiffanys on 3/18/16.
 */
module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', getFormsFromUserId);
    app.get('/api/assignment/form/:formId', getFormById);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId',updateForm);


    function createForm(req,res){
        var form = req.body;
        form.userId = req.params.userId;
        formModel.createForm(form)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status (400).send ( err);
                }
            );
    }

    function getFormById(req, res){
        var id = req.params.formId;
        formModel
            .findFormById(id)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status (400).send ( err);
                }
            );
    }

    function getFormsFromUserId(req, res){
        var userId = req.params.userId;
        formModel.findAllFormsByUserId(userId)
            .then(
                function(forms){
                    res.json(forms);
                },
                function(err){
                    res.status (400).send ( err);
                }
            );
    }

    function updateForm(req,res){
        var form = req.body;
        var formId = req.params.formId;
        formModel
            .updateFormById(formId, form)
            .then (
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function deleteForm(req, res){
        var id = req.params.formId;
        var forms = formModel.deleteFormById(id);

        res.json(forms);

    }
}