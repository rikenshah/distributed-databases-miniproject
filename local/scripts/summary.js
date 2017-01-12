var wikipedia = require("wikipedia-js");
module.exports = {
    wikitext: function(topicname, callback) {
        console.log("Inside wikitex funciton :" + topicname);
        var options = {
            query: topicname,
            format: "html",
            summaryOnly: false,
            lang: "en"
        };

        wikipedia.searchArticle(options, function(err, htmlWikiText) {
            console.log("Inside seararticlefunciton :");
            if (err) {
                console.log("An error occurred[query=%s, error=%s]", topicname, err);
                return callback(err);
            }
            console.log("Query successful[query=%s, html-formatted-wiki-text=%s]", topicname, htmlWikiText);
            callback(null, htmlWikiText);
        });
    }
};