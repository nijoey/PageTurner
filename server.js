var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var books = require('google-books-search');
var MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json());
app.use(express.static('.'));
var r = [];
var p = [];
var username;
var password;
var user;
var pwd;
var URL = 'mongodb://127.0.0.1:27017/data3'
var URL1 = 'mongodb://localhost:27017/mydatabase'

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "home.html");
});

bookname = "stephen king";
console.log(bookname);
books.search(bookname, function(error, results) {
    if (!error) {
        console.log(results);
        var booklist = results;
        MongoClient.connect(URL1, function(err, db) {
            if (err) return
            var collection = db.collection('books')
            collection.insert(booklist, function(err, result) {
                if (!err) {
                    collection.find({}).toArray(function(err, docs) {
                        console.log(docs)
                            //db.close()
                    });
                } else {
                    console.log(err);
                }
            });
        });

    } else {
        console.log(error);
    }
});
 MongoClient.connect(URL, function(err, db) {
 app.post('/Signup', function(req, response) {


        username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        password = req.body.password;
        var email = req.body.email;

        console.log(username + password + firstname + lastname + email);



        var user = [{
            'username': username,
            'password': password,
            'email': email,
            'firstname': firstname,
            'lastname': lastname,
            'aboutme': " ",
            'favourite': " ",
            'bookshelf': [],
        }];

        var attempt;
        var collection = db.collection('Signup')

        register(db, function() {


            if (r.length == 0) {
                console.log("DOES not Exist:" + r.length);
                collection.insert(user, function(err, result) {
                    collection.find().toArray(function(err, docs) {

                    })
                })
                attempt = "success";
               

            } else {
                attempt = "failure";
                console.log("Exist:" + r.length);




            }
            r = [];
            response.send(JSON.stringify({
                "Attempt": attempt
            }));



        });




    });




    var register = function(db, callback) {
        var cursor = db.collection('Signup').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {

                if (doc.username == username) {
                    r.push(doc);
                }
            } else {
                callback();
            }
        });
    };
 });

app.post('/login', function(req, res) {
    MongoClient.connect(URL, function(err, db) {
        console.log("We are connected");
        var collection = db.collection('Signup');
        var cursor = collection.find();
        user = req.body.username;
        pwd = req.body.password;
        var attempt;
        collection.findOne({
            username: user,
            password: pwd
        }, function(err, document) {
            if (document != null) {
                attempt = "";
                console.log("success")
                attempt = "success";


            } else {
                attempt = "";
                console.log("failure")
                attempt = "failure";


            }
            res.send(JSON.stringify({
                "Attempt": attempt
            }));
        });

    });

});




app.get('/userinfo/:userinfo', function(req, res) {
  MongoClient.connect(URL, function(err, db) {

    var userinfo = req.params.userinfo;
    console.log("username:" +userinfo);
    console.log(userinfo);
    MongoClient.connect(URL, function(err, db) {
        console.log("We are connected");
        var collection = db.collection('Signup');
        collection.findOne({
            username: userinfo,

        }, function(err, document) {

            res.send(JSON.stringify({
                "Attempt": document
            }));
        });

    });
});
});


app.post('/update/:username', function(req, res) {
  MongoClient.connect(URL, function(err, db) {

    var userinfo = req.params.username;
    console.log("username:" +userinfo);
    var first=req.body.firstname;
    var last =req.body.lastname;
    var about=req.body.aboutme;
    var favourite=req.body.favourite;
console.log("details"+first+last+about+favourite);
    MongoClient.connect(URL, function(err, db) {
        console.log("We are connected");
        var collection = db.collection('Signup');
        collection.update({username: userinfo}, { $set: {firstname: first,lastname:last,aboutme:about,favourite:favourite}},false,true);

            res.send(JSON.stringify({
                "Attempt": "success"
            }));


   });
 });

});















app.listen(3000);