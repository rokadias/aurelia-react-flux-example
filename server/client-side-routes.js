import express from 'express';
import path from 'path';

var app = module.exports = express.Router();

// Any request without a path should render index.html
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../index.html`));
});
