import express from 'express';
import _ from 'lodash';
var config =  require('./config');
import jwt from 'jsonwebtoken';

var app = module.exports = express.Router();

// This should be a database of users :).
var users = [{
  id: 1,
  email: 'someone@something.com',
  password: 'Passw0rd1'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

app.post('/users', function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }
  if (_.find(users, {email: req.body.email})) {
   return res.status(400).send("A user with that email already exists");
  }

  var profile = _.pick(req.body, 'email', 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

app.post('/sessions/create', function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  var user = _.find(users, {email: req.body.email});
  if (!user) {
    return res.status(401).send("The email or password don't match");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The email or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
