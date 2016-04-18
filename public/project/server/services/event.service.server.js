/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, eventModel) {
    app.post('/api/project/event', createEvent);
    app.get('/api/project/event', getEvents);
    app.get('/api/project/event?adminId=:adminId', getEventsByAdminId);
    app.get('/api/project/event?eventId=:eventId', getEventById);
    app.put('/api/project/event/:eventId', updateEventById);
    app.delete('/api/project/event/:eventId', deleteEventById);


    function createEvent(req, res){
        var event = req.body;
        eventModel.createEvent(event)
            .then(
                function(event){
                    res.json(event);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
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
        eventModel.findEventById(eventId)
            .then(
                function(event){
                    res.json(event);
                },
                function(err){
                    console.log(err);
                    res.status (400).send(err);
                }
            );
    }

    function getEventsByAdminId(req, res){
        var adminId = req.query.adminId;

        eventModel.findEventsByAdminId(adminId)
            .then(
                function(events){
                    res.json(events);
                },
                function(err){
                    console.log(err);
                    res.status (400).send(err);
                }
            );
    }

    function getAllEvents(req, res){
        eventModel
            .findAllEvents()
            .then(
                function(events){
                    res.json(events);
                },
                function(err){
                    console.log(err);
                    res.status (400).send(err);
                }
            );
    }

    function updateEventById(req, res){
        var event = req.body;
        var eventId =  req.params.eventId;

        eventModel
            .updateEvent(eventId, event)
            .then (
                function (event) {
                    return eventModel.findAllEvents();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(events){
                    res.json(events);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteEventById(req, res){
        eventModel
                .deleteEventById(req.params.eventId)
                .then(
                    function (event) {
                        return eventModel.findAllEvents();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
    };
};