var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var summary = require("./../scripts/summary.js");
var router = express.Router();
var bcrypt = require('bcryptjs');
var http = require('http');
var request = require('request');
var async = require('async')

router.get('/', function(req, res, next) {
    res.render('index', {
        user: req.session.user
    });
});

router.get('/login', function(req, res) {
    if(req.session.user)
    {
        res.redirect('/dashboard');
    }
    res.render('login', {
        user: req.user
    });

});

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    Account.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!user) {
        	res.redirect('/login');
            return res.status(404).send();
        }
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch && isMatch == true) {
                //res.redirect('/'); 
                req.session.user = user;
                //return res.status(200).send();
                res.redirect('/dashboard');
            } else {
                return res.redirect('/login');
            }
        });

    })
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/register', function(req, res) {
    res.render('register', {});
});

router.get('/content/:topicname', function(req, res) {
    // var topic = req.body.inputText;
    var topic = req.params.topicname;
    var user=req.session.user;
    console.log("Hello "+topic);
    console.log(typeof(topic));
    var p = Account.findOne({
        'username': req.session.user.username
    });
    console.log(user.historyCounter);
    if(user.historyCounter=="0") {
        req.session.user.search1 = topic;
        req.session.user.historyCounter = "1";
        console.log("Session varible search 2:"+req.session.user.search1);
        Account.update(user, {
            '$set': {
                'search1': topic,
                'historyCounter' : "1"
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return res.status(202).send();
            }
            //return res.status(205).send();
        })
    }
    else if(user.historyCounter=="1") {
        req.session.user.search2 = topic;
        req.session.user.historyCounter = "2";
        console.log("Session varible search 2:"+req.session.user.search2);
        Account.update(user, {
            '$set': {
                'search2': topic,
                'historyCounter' : "0"
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return res.status(202).send();
            }
            //return res.status(205).send();
        })
    } //end of else if

    else if(user.historyCounter=="2") {
        req.session.user.search3 = topic;
        req.session.user.historyCounter = "3";
        console.log("Session varible search 3:"+req.session.user.search3);
        Account.update(user, {
            '$set': {
                'search3': topic,
                'historyCounter' : "3"
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return res.status(202).send();
            }
            //return res.status(205).send();
        })
    } //end of else if


    else if(user.historyCounter=="3") {
        req.session.user.search4 = topic;
        req.session.user.historyCounter = "4";
        console.log("Session varible search 4:"+req.session.user.search4);
        Account.update(user, {
            '$set': {
                'search2': topic,
                'historyCounter' : "4"
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return res.status(202).send();
            }
            //return res.status(205).send();
        })
    } //end of else if\


    else if(user.historyCounter=="4") {
        req.session.user.search5 = topic;
        req.session.user.historyCounter = "0";
        console.log("Session varible search 5:"+req.session.user.search5);
        Account.update(user, {
            '$set': {
                'search5': topic,
                'historyCounter' : "0"
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return res.status(202).send();
            }
            //return res.status(205).send();
        })
    } //end of else if
    else{

    }
    var t0 = Date.now(); 
    async.series([
    /*
     * First external endpoint
     */
    function(callback) {
      var url = "https://rikenrocks.herokuapp.com/wiki/"+topic;
      request(url, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        console.log("Before parse :"+typeof(body));
        if(body.trim()=='No article found'){
        	console.log("Really not found");
    		res.render('content',{text:"\nNo Article Found",topicname:topic, user:req.session.user, time:(Date.now()-t0)});
        }
        else{
	        obj = JSON.parse(body);
	        console.log("After parse :"+obj);
	        callback(false, obj);
        }
      });
    },
  ],

  /*
   * Collate results
   */
  function(err, results) {
    if(err) { console.log(err); res.send(500,"Server Error"); return; }
    if(obj){
    	res.render('content',{text:results[0]["content"],topicname:topic, user:req.session.user, time:(Date.now()-t0)});
  	}//end of if
  }//end of function err
  );//end of async
});

// router.post('/content', function(req, res) {
//     var topic = req.body.inputText;
//     console.log("topic :"+topic);
//     var somedata = "";
//     console.log("request arrived for URL", req.url);

//     var url = 'https://rikenrocks.herokuapp.com/wiki/'+topic;
//     request(url, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         var wikitext = JSON.parse(body);
//         console.log("Got a response: ", JSON.stringify(wikitext[0]['content']));

//         // res.send(JSON.stringify(wikitext[0]['content']));
//          res.render('content', {
//             text : wikitext[0]['content'],
//             topicname : topic
//          });
//       } else {
//         console.log("Got an error: ", error, ", status code: ", response.statusCode);
//       }
//     });
// });

router.post('/input', function(req, res) {
   var topic = req.body.inputText;
   console.log("In Input : "+topic);
   res.redirect('content/'+topic);
});

router.get('/dashboard', function(req, res) {
    res.render('dashboard', {
            user: req.session.user
        });

    //for updating db, updating search1 to hi and it WAS successful! woho
    /*if(req.session.user) {
    	var p = Account.findOne({
	        'username': req.session.user.username
	    })
	    Account.update(p, {
	        '$set': {
	            'search1': "hello"
	        }
	    }, function(err) {
	        if (err) {
	            console.log(err);
	            return res.status(202).send();
	        }
	        //return res.status(205).send();
	    })
	
    
	  	
	}
    
    else {
    	res.redirect('/login');
    }
    return res.status(900).send();
*/
});

router.get('/profile', function(req, res) {
    var user=req.session.user;
    // console.log(p.username);
    res.render('profile', {
        user: user,
        search1 : req.session.search1,
        search2 : req.session.search2,
        search2 : req.session.search3,
        search4 : req.session.search4,
        search5 : req.session.search5
    });
});

router.get('/editprofile', function(req, res) {
    res.render('profileedit', {
        user: req.session.user
    });
});

router.post('/editprofile', function(req, res) {
    var p = Account.findOne({
        'username': req.session.user.username
    })
    var email = req.body.email;
    var password = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            password = hash;
            Account.update(p, {
                '$set': {
                    'password': password
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                    return res.status(202).send();
                }
                //return res.status(205).send();
            })
        })
    })

    res.redirect('/');
});

router.post('/dashboard', function(req, res) {

})

router.post('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var search1 = "";
    var search2 = "";
    var search3 = "";
    var search4 = "";
    var search5 = "";
    var countHistory = "0";

    var newuser = new Account();
    newuser.username = username;
    newuser.password = password;
    newuser.firstname = firstname;
    newuser.lastname = lastname;
    newuser.email = email;
    newuser.search1 = search1;
    newuser.search2 = search2;
    newuser.search3 = search3;
    newuser.search4 = search4;
    newuser.search5 = search5;
    newuser.historyCounter = countHistory;
    newuser.save(function(err, savedUser) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        res.redirect('/');
        return res.status(200).send();
    })

});



module.exports = router;