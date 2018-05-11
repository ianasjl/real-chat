'use strict';
//миграция из MongoDB в PostgreSQL
//коллекция/таблица users

var mongoClient = require("mongodb").MongoClient;

var needle = require('needle');
var rp = require('request-promise');

var url = "mongodb://root:root@ds119258.mlab.com:19258/chat";
mongoClient.connect(url, function(err, db){

    if(err) return console.log(err);

    db.collection("users").find().toArray(function(err, results){
      var i;
      for (i=0; i<results.length; i++) {

        needle
            .post('http://127.0.0.1:8000/registerUser', results[i], { multipart: true })
            .on('readable', function() { /* eat your chunks */ })
            .on('done', function(err, resp) {
                console.log('Ready-o!');
            })
         }
    db.close();
    });
});
