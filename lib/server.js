/*
 *
 * Server-related tasks
 *
 */

"use strict";

// Dependencies
const config = require('./config');
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const fs = require('fs');
const handlers = require('./handlers');
const _data = require('./data');
const helpers = require('./helpers');
const path = require('path');
const util = require('util');
const debug = util.debuglog('server');

// Instantiate server module object
let server = {};

// Instantiate http server
server.httpServer = http.createServer( (req,res)  => server.unifiedServer(req,res) );

// All the server logic
server.unifiedServer = (req,res) => {

  // Get the url and parse it
  let parsedUrl = url.parse(req.url,true);

  // Get the path from the url
  let path = parsedUrl.pathname;

  // remove first and trail slash
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the querystring as an object
  let queryStringObject = parsedUrl.query;

  // Get the http methode
  let method = req.method.toLowerCase();

  // Get the headers as an object
  let headers = req.headers;

  // Get the payload if their is one
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    // Choose de handler this request should go to
    let chosenHandlers = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

    // Construct data object to send to the handlers
    let data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)
    };

    // Route the request to the handler specify in th router
    chosenHandlers(data, (statusCode, payload) => {

      // use statuscode called back by the handler or default to 200
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      // use payload called back by the handler or default to an empty object
      payload = typeof(payload) === 'object' ? payload : {};

      // convert the payload to a string_decoder
      let payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // If the response is 200, print in green otherwise print in red
      if(statusCode == 200) {
        debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
            } else {
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      }
    });
  });
};

// Define a request router
server.router = {
  'ping' : handlers.ping,
  'users' : handlers.users,
  'tokens' : handlers.tokens,
  'menu' : handlers.menu,
  'shopping' : handlers.shopping,
  'order' : handlers.order
};

// Init script
server.init = () => {

  //start the http httpServer
  server.httpServer.listen(config.httpPort, () => {
    console.log('\x1b[36m%s\x1b[0m',`httpServer is listening on port ${config.httpPort} in ${config.envName} mode`);
  });
};

// Export the modules
module.exports = server;
