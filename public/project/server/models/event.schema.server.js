/**
 * Created by Tiffanys on 4/16/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a event schema
    var EventSchema = mongoose.Schema({
        title : String,
        description: String,
        adminId: Number,
        expenses: [ExpenseSchema]
    }, {collection: 'event'});
    return EventSchema;
};
