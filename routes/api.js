'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;  // Get the input from query string
    const conversionResult = convertHandler.handleConversion(input);

    // If the result is a string, it's an error, so send the error response
    if (typeof conversionResult === 'string') {
      return res.status(400).send(conversionResult); // Send the error message as 400 response
    }

    // Otherwise, send the conversion result as JSON
    res.json(conversionResult);
  });

};
