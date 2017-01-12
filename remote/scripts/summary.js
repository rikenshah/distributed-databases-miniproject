var wikipedia = require("wikipedia-js");
var fs = require('fs');
module.exports = {
    wikitext: function(topicname, callback) {
        console.log("Inside wikitex funciton :" + topicname);
        var options = {
            query: topicname,
            format: "html",
            summaryOnly: true,
            lang: "en"
        };

        wikipedia.searchArticle(options, function(err, htmlWikiText) {
            console.log("Inside seararticlefunciton :");
            if (err) {
                console.log("An error occurred[query=%s, error=%s]", topicname, err);
                return callback(err);
            }
            console.log("Query successful[query=%s, html-formatted-wiki-text=%s]", topicname, htmlWikiText);
            
            //writing file for debugging purpose
            fs.writeFile("test.txt", htmlWikiText, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            }); 

            callback(null, htmlWikiText);
        });
    }
};