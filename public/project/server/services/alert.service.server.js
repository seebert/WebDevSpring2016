/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, alertModel) {
    app.post('/api/project/alert', createAlert);
    app.get('/api/project/alert', getAlerts);
    app.get('/api/project/alert?alertId=:alertId', getAlertById);
    app.get('/api/project/alert?payeeId=:payeeId', getAlertsByPayeeId);
    app.put('/api/project/alert/:alertId', updateAlertById);
    app.delete('/api/project/alert/:alertId', deleteAlertById);

    function createAlert(req, res){
        console.log("Create alert");
        var alert = alertModel.createAlert(req.body);
        res.json(alert);
    }

    function getAlerts(req, res){
        if(req.query.alertId){
            getAlertById(req,res);
        }else if(req.query.payeeId) {
            getAlertsByPayeeId(req,res);
        }else{
            getAllAlerts(req, res);
        }
    }

    function getAlertById(req, res){
        var alertId = req.query.alertId;
        console.log("Get alert by id:" + alertId);
        var alert = alertModel.findAlertById(alertId);

        res.json(alert);
    }

    function getAlertsByPayeeId(req, res){
        var payeeId = req.query.payeeId;
        console.log("Get alert by payee id:" + payeeId);
        var alert = alertModel.findAlertsByPayeeId(payeeId);

        res.json(alert);
    }

    function getAllAlerts(req, res){
        console.log("Get all alerts");
        var alerts = alertModel.findAllAlerts();

        res.json(alerts);
    }

    function updateAlertById(req, res){
        alertModel.updateUser(req.params.alertId, req.params.alert);
        var alerts = alertModel.findAllAlerts();
        res.json(alerts);
    }

    function deleteAlertById(req, res){
        alertModel.deleteAlertById(req.params.alertId);
        var alerts = alertModel.findAllAlerts();
        res.json(alerts);
    }

};