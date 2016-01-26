import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import requireDir from 'require-dir';

// Create a basic express application
const app = express();

dotenv.load();

// Set express up to automatically parse incoming JSON requests
// into the request object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name == 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler());
}

app.use(require('./static-content-routes'));
app.use(require('./user-routes'));
app.use(require('./client-side-routes'));

// Store the app globally for convenience
global.app = app;

var port = process.env.PORT || 9000;

// Start the web server
var server = http.createServer(app).listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server listening at http://${host}:${port}`);
});
