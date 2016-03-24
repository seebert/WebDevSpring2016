/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, alertModel) {
    app.post('/api/project/alert', createAlert);
    app.get('/api/project/alert/', getAllAlerts);
    app.get('/api/project/alert?alertId=:alertId', getAlertById);
    app.get('/api/project/alert?payeeId=:payeeId', getAlertsByPayeeId);
    app.put('/api/project/alert/:alertId', updateAlertById);
    app.delete('/api/project/alert/:alertId', deleteAlertById);

};