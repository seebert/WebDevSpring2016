/**
 * Created by Tiffanys on 3/25/16.
 */
module.exports = function(app, searchModel) {
    app.post('/api/project/search?search=:req', search);

    function search(req, res) {
    }
}