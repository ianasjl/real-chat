'use strict';
//external APIs
//collection "users"

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.post('/users', (req, res) => {
    const user = {
                   username: req.body.username,
                   email: req.body.email,
                   password: req.body.password,
                   status: req.body.status,
                   img: req.body.img,
                   online: req.body.online };
    db.collection('users').insert(user, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result.ops[0]);
        }
      });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('User ' + id + ' deleted!');
      }
    });
  });

  app.put ('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = { text: req.body.body, title: req.body.title };
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });


};
