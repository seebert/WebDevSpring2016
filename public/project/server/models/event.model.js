/**
 * Created by Tiffanys on 3/23/16.
 */
var mock = require("./event.mock.json");
module.exports = function(app, db) {
    var api = {
        createEvent: createEvent,
        findAllEvents: findAllEvents,
        findEventsByAdminId: findEventsByAdminId,
        findEventById: findEventById,
        updateEvent: updateEvent,
        deleteEventById : deleteEventById
    };

    return api;

    function createEvent(event) {
        var event = {
            title: event.title,
            description: event.description,
            adminId: event.adminId,
            expenses: event.expenses,
            _id : (new Date).getTime()
        };
        mock.push(event);
        return event;
    }

    function findAllEvents(){
        return mock;
    }

    function findEventsByAdminId(id){
        var foundEvents = [];
        for (var e in mock) {
            if (mock[e].adminId == id) {
                foundEvents.push(mock[e]);
            }
        }
        return foundEvents;
    }

    function findEventById(id){
        for (var e in mock) {
            if (mock[e]._id == id) {
                return mock[e];
            }
        }
    }


    function updateEvent(eventId, event) {
        for (var e in mock) {
            if (mock[e]._id === eventId) {
                mock[e].title = event.title;
                mock[e].description = event.description;
                mock[e].adminId = event.adminId;
                mock[e].expenses = event.expenses;
                return mock[e];
            }
        }
        return null;
    }

    function deleteEventById(eventId) {
        for (var e in mock) {
            if (mock[e]._id === eventId) {
                mock.splice(e, 1);
            }
        }
        return mock;
    }
};