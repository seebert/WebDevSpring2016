/**
 * Created by Tiffanys on 3/3/16.
 */
(function() {
    angular
        .module("PaymentApp")
        .factory("EventsService", EventsService);

    function EventsService() {
        var events = [];
        events = [
            {	"_id":1, "title":"Ski Trip", "description" : "Group trip taken in March to NH",
                "adminId" : 567, "expenses" : [1, 2] },
            {	"_id":2, "title":"September Bills", "description" : "Bills split amongst roommates - September 2015",
                "adminId" : 567, "expenses" : [345] }
        ];

        var model = {
            events: events,
            createEvent: createEvent,
            findAllEvents: findAllEvents,
            findEventsByAdminId: findEventsByAdminId,
            findEventsById: findEventsById,
            updateEvent: updateEvent,
            deleteEventById : deleteEventById
        };
        return model;

        function createEvent(event, callback) {
            var event = {
                title: event.title,
                description: event.description,
                adminId: event.adminId,
                expenses: event.expenses,
                _id : (new Date).getTime()
            };
            model.events.push(event);
            return callback(event);
        }

        function findAllEvents(callback){
            return callback(model.events);
        }

        function findEventsByAdminId(id, callback){
            var foundEvents = [];
            for (var e in model.events) {
                if (model.events[e].adminId == id) {
                    foundEvents.push(model.events[e]);
                }
            }
            return callback(foundEvents);
        }

        function findEventsById(id, callback){
            for (var e in model.events) {
                if (model.events[e]._id == id) {
                    return callback(model.events[e]);
                }
            }
        }


        function updateEvent(eventId, event, callback) {
            for (var e in model.events) {
                if (model.events[e]._id === eventId) {
                    model.events[e].title = event.title;
                    model.events[e].description = event.description;
                    model.events[e].adminId = event.adminId;
                    model.events[e].expenses = event.expenses;
                    return callback(model.events[e]);
                }
            }
            return callback(null);
        }

        function deleteEventById(eventId, callback) {
            for (var e in model.events) {
                if (model.events[e]._id === eventId) {
                    model.events.splice(e, 1);
                }
            }
            return callback(model.events);
        }
    }
})();