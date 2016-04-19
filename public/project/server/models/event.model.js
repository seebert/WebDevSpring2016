/**
 * Created by Tiffanys on 3/23/16.
 */
var q = require("q");
module.exports = function(mongoose) {
    var EventSchema = require("./event.schema.server.js")(mongoose);
    var Event = mongoose.model("Event", EventSchema);
    var api = {
        createEvent: createEvent,
        findAllEvents: findAllEvents,
        findEventsByAdminId: findEventsByAdminId,
        findEventById: findEventById,
        updateEvent: updateEvent,
        deleteEventById : deleteEventById,
        getMongooseModel: getMongooseModel
    };

    return api;

    function getMongooseModel(){
        return Event;
    }

    function createEvent(event) {
        var deferred = q.defer();
        Event.create(event, function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllEvents(){
        return Event.find();
    }

    function findEventsByAdminId(id){
        return Event.find({adminId : id});
    }

    function findEventById(id){
        return Event.findById(id);
    }


    function updateEvent(eventId, event) {
        return Event
            .findOneAndUpdate (
                {_id: eventId},
                {$set: event});
    }

    function deleteEventById(eventId) {
        return Event.remove({_id: eventId});
    }
};