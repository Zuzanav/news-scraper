
var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
    router.get("/", function(req, res){
        res.render("home");
    });

    router.get("/saved", function(req, res){
        res.render("saved");
    })

    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        headlinesController.get(query, function(data){
            res.json(data);
        });
    });


}