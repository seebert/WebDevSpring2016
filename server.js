var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose      = require('mongoose');
var passport      = require('passport');
var db = mongoose.connect('mongodb://localhost/assignment');
var app = express();


app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);
