/**
 * Created by Tiffanys on 4/16/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a alert schema
    var AlertSchema = mongoose.Schema({
        eventId: Number,
        expenseId: Number,
        payeeId: Number,
        payerId: Number
    }, {collection: 'alert'});
    return AlertSchema;
};
