// REQUIRES ---------------------------------

var request = require("request");
var cheerio = require("cheerio");

//-------------------------------------------

var scrape = function (cb) {

request("https://screenrant.com/movie-news/", function(err, res, body) {
   
    var $ = cheerio.load(body);

    var articles = [];


  // Select each element in the HTML body 
  $(".bc-info").each(function(i, element) {

    var title = $(element).children(".bc-title").text().trim();
    var summary = $(element).children(".bc-excerpt").text().trim();
    var link = $(element).find(".bc-title-link").attr("href");

    if(title && summary && link) {
        articles.push({
            title: title,
            summary: summary,
            link: link
          });
        articles.push(dataToAdd);
    }

  });

  cb(articles);

});

};

module.exports = scrape;

