/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .factory("AlertsService", AlertsService);

    function AlertsService(){
        var alerts = [];
        alerts = [
            { "_id" : 1, "eventId" : 1, "expenseId" : 1,
                "payeeId" : 567, "payerId" : 123 },
            { "_id" : 2, "eventId" : 1, "expenseId" : 2,
                "payeeId" : 567, "payerId" : 234 }
        ];

        var model = {
            alerts: alerts,
            createAlert: createAlert,
            findAllAlerts: findAllAlerts,
            findAlertById: findAlertById,
            findAlertsByPayeeId: findAlertsByPayeeId,
            updateAlert: updateAlert,
            deleteAlertById : deleteAlertById
        };

        return model;

        function createAlert(alert, callback) {
            var alert = {
                eventId: alert.eventId,
                expenseId: alert.expenseId,
                payeeId: alert.payeeId,
                payerId: alert.payerId,
                _id : (new Date).getTime()
            };
            model.alerts.push(alert);
            return callback(alert);
        }

        function findAllAlerts(callback){
            return callback(model.alerts);
        }

        function findAlertById(id, callback){
            for (var a in model.alerts) {
                if (model.alerts[a]._id == id) {
                    return callback(model.alerts[a]);
                }
            }
        }


        function findAlertsByPayeeId(id, callback){
            var alerts = [];
            for (var a in model.alerts) {
                if (model.alerts[a].payeeId == id) {
                   alerts.push(model.alerts[a]);
                }
            }

            return callback(alerts);
        }

        function updateAlert(alertId, alert, callback) {
            for (var a in model.alerts) {
                if (model.alerts[a]._id === alertId) {
                    model.alerts[a].eventId = alert.eventId;
                    model.alerts[a].expenseId = alert.expenseId;
                    model.alerts[a].payeeId = alert.payeeId;
                    model.alerts[a].payerId = alert.payerId;
                    return callback(model.alerts[a]);
                }
            }
            return callback(null);
        }

        function deleteAlertById(alertId, callback) {
            for (var a in model.alerts) {
                if (model.alerts[a]._id === alertId) {
                    model.alerts.splice(a, 1);
                }
            }
            return callback(model.alerts);
        }

    }
})();
