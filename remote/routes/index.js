var express = require('express');
var router = express.Router();
var summary = require("./../scripts/summary.js");
var cheerio = require('cheerio');
var current = new Date();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/input', function(req, res, next) {
    res.render('content/input', {
        title: 'Express'
    });
});

router.post('/prewiki', function(req, res, next) {
    var topicname = req.body.topicname;
    res.redirect('wiki/' + topicname);
});


// router.get('/wiki/:topicname', function(req, res, next) {
//  var topicname = req.params.topicname;
//      console.log(topicname);
//      var first = summary.wikitext(topicname);
//      res.send("Hello "+first);
// });



router.get('/wiki/:topicname', function(req, res, next) {
    var topicname = req.params.topicname;
    var singleRelatedTopic = "hello";
    console.log(topicname);
    var flagWiki = 1; //1 means fetch from remote, 0 meand fetch from db
    var db = req.db;
    var collection = db.get('history');
    collection.find({
        "topicname": topicname
    }, function(err, result) {
        if(err){
            console.log("The error fecthing from database :"+err);
        }
        if (result.length == 0) {
            console.log(err);
            console.log("There was a problem finding the information from the database.");
            console.log("Fetching from Wiki....")
            summary.wikitext(topicname, function(err, result) {
                if (err) {
                    return res.send(err);
                }
                if (!result) {
                    return res.send('No article found');
                }
                $ = cheerio.load(result);

                var relatedTopics = [];
                $('a').each(function(i, elem) {
                    singleRelatedTopic = $(this);
                    relatedTopics[i] = singleRelatedTopic;
                });

                console.log(relatedTopics);

                collection.insert({
                    "topicname": topicname,
                    "content": result,
                    "date": new Date()
                }, function(err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    } else {
                        // And forward to success page
                        console.log("The fresh data has been added to the database");
                    }
                });
                // result = "original<br>" + result + "<br>new<br>" + $('p').text() + " <br><h2>Related Topics</h2><br> " + relatedTopics.join("<br>");
                //result = $('p').text() + " <br><h2>Related Topics</h2><br> " + relatedTopics.join("<br>");

                //result has the data fetched from wiki
                //write query to insert result in db ,reuslt and topicname and date

                //res.json({ text: result });
                var resultJson = {
                    "topicname": topicname,
                    "content": result,
                    "date": new Date()
                }
                res.json(resultJson);

            }); //end of fetch wiki function

        } else {
            console.dir("Topic found from database =\n" + result);
            console.log(result);
            var olddate = result[0]['date']
            console.log("The date when the data was stored : " + result[0]['date']);

            current.setDate(current.getDate());
            console.log("Today's date : " + current);
            var diff = current - olddate;
            console.log("Difference between the 2 dates in milliseconds : " + diff);
            diffdays = Math.round((diff) / (1000 * 60 * 60 * 24));
            console.log("Difference in days : " + diffdays);
            // console.log("Date"+result.date);
            if (diffdays <= 7) {
                console.log("It is not an old data")
                res.json(JSON.stringify(result));
            } else {
                collection.remove({
                    "topicname": topicname
                }, function(err, doc) {
                    if (err) {
                        console.log("error");
                    } else {
                        console.log("Old data deleted");
                    }
                });
                console.log("Fetching new(latest) data from Wiki and adding it to db");
                summary.wikitext(topicname, function(err, result) {
                    if (err) {
                        return res.send(err);
                    }
                    if (!result) {
                        return res.send('No article found');
                    }
                    $ = cheerio.load(result);

                    var relatedTopics = [];
                    $('a').each(function(i, elem) {
                        relatedTopics[i] = $(this);
                    });

                    collection.insert({
                        "topicname": topicname,
                        "content": result,
                        "date": new Date()
                    }, function(err, doc) {
                        if (err) {
                            // If it failed, return error
                            res.send("There was a problem adding the information to the database.");
                        } else {
                            // And forward to success page
                            console.log("Added successfully");
                        }
                    });

                    var resultJson = {
                    "topicname": topicname,
                    "content": result,
                    "date": new Date()
                }
                res.json(JSON.stringify(resultJson));

                }); //end of fetch wiki function

                // res.json(result);
            }
        }
    });
});


router.get('/topiclist', function(req, res) {
    var db = req.db;
    var collection = db.get('history');
    collection.find({}, {}, function(e, docs) {
        res.render('topiclist', {
            "topiclist": docs
        });
    });
});


module.exports = router;