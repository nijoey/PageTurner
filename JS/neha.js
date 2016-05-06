var books = require('google-books-search');
var MongoClient = require('mongodb').MongoClient


var URL1 = 'mongodb://localhost:27017/mydatabase'

bookname = "stephen king";
console.log(bookname);
books.search(bookname, function(error, results) {
    if (!error) {
        console.log(results);


        var booklist = results;
        MongoClient.connect(URL1, function(err, db) {5
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
