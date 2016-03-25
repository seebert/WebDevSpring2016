/**
 * Created by Tiffanys on 3/3/16.
 */
(function() {
    angular
        .module("PaymentApp")
        .factory("EventsService", EventsService);

    function EventsService($http) {

        var api = {
            createEvent: createEvent,
            findAllEvents: findAllEvents,
            findEventsByAdminId: findEventsByAdminId,
            findEventsById: findEventsById,
            updateEvent: updateEvent,
            deleteEventById : deleteEventById
        };
        return api;

        function createEvent(event) {
            return $http.post('/api/project/event', event);
        }

        function findAllEvents(){
            return $http.get('/api/project/event');
        }

        function findEventsByAdminId(id){
            return $http.get('/api/project/event?adminId='+id);
        }

        function findEventsById(id){
            return $http.get('/api/project/event?eventId='+id);
        }

        function updateEvent(eventId, event) {
            return $http.put('/api/project/event/'+eventId, event);
        }

        function deleteEventById(eventId) {
            return $http.delete('/api/project/event/'+eventId);
        }
    }
})();