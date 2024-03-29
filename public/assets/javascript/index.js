$(document).ready(function() {


var articleContainer = $(".article-container");
$(document).on("click", ".btn.save", handleArticleSave);
$(document).on("click", ".scrape-new", handleArticleScrape);

initiPage();

function initiPage() {

    articleContainer.empty();
    $.get("/api/headlines?saved=false")
        .then(function(data) {
            if (data && data.length) {
                renderArticles(data);
            } else {
                alert("no articles");
            }
        });
}

function renderArticles(articles) {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
        articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
}

function createPanel(article) {
    var panel = 
    $(["<div class='panel panel-default'>", 
    "<div class='panel-heading'>",
    "<h3>",
    article.headline,
    "<a class='btn btn-success save'>", 
    "Save Article",
    "</a>",
    "</h3>",
    "</div>",
    "<div class='panel-body'>",
    article.summary,
    "</div>",
    "</div"
    ].join(""));
panel.data("_id", article._id);
return panel;
}

function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    $.ajax({
        method: "PATCH",
        url: "/api/headlines",
        data: articleToSave
    })
    .then(function(data) {
        if (data.ok) {
            initiPage();
        }
    });
}

function handleArticleScrape() {
    $.get("/api/fetch")
        .then(function(data) {
            initiPage();
            
        })
}








})