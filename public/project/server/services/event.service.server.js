/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, eventModel) {
    app.post('/api/project/event', createEvent);
    app.get('/api/project/event/', getEvents);
    app.get('/api/project/event?adminId=:adminId', getEventsByAdminId);
    app.get('/api/project/event?eventId=:eventId', getEventById);
    app.put('/api/project/event/:eventId', updateEventById);
    app.delete('/api/project/event/:eventId', deleteEventById);


    function createEvent(req, res){
        console.log("Create event");
        eventModel.createEvent(req.body);
        res.json(null);
    }

    function getEvents(req, res){
        if(req.query.eventId){
            getEventById(req,res);
        }else if(req.query.adminId) {
            getEventsByAdminId(req,res);
        }else{
            getAllEvents(req, res);
        }
    }

    function getEventById(req, res){
        var eventId = req.query.eventId;
        console.log("Get event by id:" + eventId);
        var event = eventModel.findEventById(eventId);

        res.json(event);
    }

    function getEventsByAdminId(req, res){
        var adminId = req.query.adminId;
        console.log("Get event by admin id:" + adminId);
        var events = eventModel.findEventsByAdminId(adminId);

        res.json(events);
    }

    function getAllEvents(req, res){
        console.log("Get all events");
        var events = eventModel.findAllEvents();

        res.json(events);
    }

    function updateEventById(req, res){
        eventModel.updateEvent(req.params.eventId, req.params.event);
        var events = eventModel.findAllEvents();

        res.json(events);
    }

    function deleteEventById(req, res){
        eventModel.deleteEventById(req.params.eventId);
        var events = eventModel.findAllEvents();

        res.json(events);
    }
};