import express from 'express';
import path from 'path';

var app = module.exports = express.Router();

// Set up static content paths
app.use('/jspm_packages', express.static(`${__dirname}/../jspm_packages`));
app.use('/dist', express.static(`${__dirname}/../dist`));
app.use('/styles', express.static(`${__dirname}/../styles`));
app.use('/data', express.static(`${__dirname}/../data`));

// Any request to /config.js should render the root config.js
app.get('/config.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../config.js`));
});
