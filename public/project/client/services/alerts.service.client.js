/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .factory("AlertsService", AlertsService);

    function AlertsService(){
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
            return $http.post('/api/project/alert', alert);
        }

        function findAllAlerts(){
            return $http.get('/api/project/alert');
        }

        function findAlertById(id){
            return $http.get('/api/project/alert?alertId='+id);
        }


        function findAlertsByPayeeId(id){
            return $http.get('/api/project/alert?payeeId='+id);
        }

        function updateAlert(alertId, alert) {
            return $http.put('/api/project/alert/'+alertId, alert);
        }

        function deleteAlertById(alertId) {
            return $http.delete('/api/project/alert/'+alertId);
        }

    }
})();
