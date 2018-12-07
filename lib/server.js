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

    //Choose the handler this request should go to
    let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
    // If the request is within the public directory use de public handler instead
        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;
    //Construct data object to send to the handlers
    let data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)
    };

    //Route the request to the handler specify in th router
    chosenHandler(data, (statusCode, payload,contentType) => {
      // Determine the type of response (fallback to JSON)
      contentType = typeof(contentType) == 'string' ? contentType : 'json';
      //use statuscode called back by the handler or default to 202
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      //Return the response parts that are content specific
      let payloadString = '' ;
      if(contentType == 'json') {
        res.setHeader('Content-Type','application/json');
        payload = typeof(payload) === 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
      }
      if(contentType == 'html') {
        res.setHeader('Content-Type','text/html');
        payloadString = typeof(payload) == 'string' ? payload : '';
      }
      if(contentType == 'favicon') {
        res.setHeader('Content-Type','image/x-icon');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      if(contentType == 'css') {
        res.setHeader('Content-Type','text/css');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      if(contentType == 'png') {
        res.setHeader('Content-Type','image/png');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      if(contentType == 'jpg') {
        res.setHeader('Content-Type','image/jpg');
        payloadString = typeof(payload)!== 'undefined' ? payload : '';
      }
      if(contentType == 'plain') {
        res.setHeader('Content-Type','text/plain');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      //Return the response that are common to all content types
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
  '' : handlers.index,
  'account/create' : handlers.accountCreate, //signup
  'account/edit' : handlers.accountEdit,
  'account/deleted' : handlers.accountDeleted,
  'session/create' : handlers.sessionCreate, //login
  'session/deleted' : handlers.sessionDeleted,
  'menu/show' : handlers.menuShow, //show all pizza with a link to fill shopping cart
  'cart/show' : handlers.cartShow, // show item in cart with link to place order
  'ping' : handlers.ping,
  'api/users' : handlers.users,
  'api/tokens' : handlers.tokens,
  'api/menu' : handlers.menu,
  'api/shopping' : handlers.shopping,
  'api/order' : handlers.order
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
