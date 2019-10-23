// REQUIRES ---------------------------------

var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

//-------------------------------------------

var scrape = function (cb) {
// Request via axios to grab HTML
axios.get("https://screenrant.com/movie-news/").then(function(response) {

  // Load HTML into cheerio and save it to a variable
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body 
  $(".bc-info").each(function(i, element) {

    var title = $(element).children(".bc-title").text().trim();
    var summary = $(element).children(".bc-excerpt").text().trim();
    var link = $(element).find(".bc-title-link").attr("href");

    // Save these results in an object
    results.push({
      title: title,
      summary: summary,
      link: link
    });
  });

});

}

module.exports = scrape;

