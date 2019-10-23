// DEPENDENCIES =============================================================
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");



// PORT SET UP ==============================================================
var PORT = process.env.PORT || 3000;

// SET UP EXPRESS APP ======================================================
var app = express(); 

var router = express.Router();
app.use(express.static(__dirname + "/public"));
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


// CONNECTING HANDLEBARS TO EXPRESS =========================================
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// BODY PARSER ==============================================================
app.use(bodyParser.urlencoded({
    extended: false
}));


// ROUTE REQUIRMENT ========================================================
require("./config/routes")(router);


// USER ROUTER =============================================================
app.use(router);

// START SERVER =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  