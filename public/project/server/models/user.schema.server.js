/**
 * Created by Tiffanys on 3/30/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phones: [String],
        roles: [String]
    }, {collection: 'user'});
    return UserSchema;
};