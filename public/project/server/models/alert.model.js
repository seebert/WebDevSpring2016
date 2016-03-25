/**
 * Created by Tiffanys on 3/23/16.
 */
var mock = require("./alert.mock.json");
module.exports = function(app, db) {
    var api = {
        createAlert: createAlert,
        findAllAlerts: findAllAlerts,
        findAlertById: findAlertById,
        findAlertsByPayeeId: findAlertsByPayeeId,
        updateAlert: updateAlert,
        deleteAlertById : deleteAlertById
    };

    return api;


    function createAlert(alert) {
        var alert = {
            eventId: alert.eventId,
            expenseId: alert.expenseId,
            payeeId: alert.payeeId,
            payerId: alert.payerId,
            _id : (new Date).getTime()
        };
        mock.push(alert);
        return alert;
    }

    function findAllAlerts(){
        return mock;
    }

    function findAlertById(id){
        for (var a in mock) {
            if (mock[a]._id == id) {
                return mock[a];
            }
        }
    }


    function findAlertsByPayeeId(id){
        var alerts = [];
        for (var a in mock) {
            if (mock[a].payeeId == id) {
                alerts.push(mock[a]);
            }
        }

        return alerts;
    }

    function updateAlert(alertId, alert) {
        for (var a in mock) {
            if (mock[a]._id == alertId) {
                mock[a].eventId = alert.eventId;
                mock[a].expenseId = alert.expenseId;
                mock[a].payeeId = alert.payeeId;
                mock[a].payerId = alert.payerId;
                return mock[a];
            }
        }
        return null;
    }

    function deleteAlertById(alertId) {
        for (var a in mock) {
            if (mock[a]._id == alertId) {
                mock.splice(a, 1);
            }
        }
        return mock;
    }

};
