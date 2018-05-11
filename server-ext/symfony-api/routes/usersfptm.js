'use strict';
//миграция из PostgreSQl в MongoDB
//коллекция/таблица users
var mongoClient = require('mongodb').MongoClient;

var needle = require('needle');

var URL = 'http://127.0.0.1:8000/allusers/';

needle.get(URL, function(err, res){
    if (err) throw err;
    console.log(res.body);
    console.log(res.statusCode);

    var url = "mongodb://root:root@ds119258.mlab.com:19258/chat";
    mongoClient.connect(url, function(err, db){

        db.collection("users").insertMany(res.body, function(err, results){

            console.log(results);
            db.close();
        });
    });

});
