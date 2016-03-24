/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, eventModel) {
    app.post('/api/project/event', createEvent);
    app.get('/api/project/event/', getEvents);
    app.get('/api/project/event?adminId=:adminId', findEventsByAdminId);
    app.get('/api/project/event?eventId=:eventId', findEventsById);
    app.put('/api/project/event/:eventId', updateEventById);
    app.delete('/api/project/event/:eventId', deleteEventById);

};