/*
 * Helpers for various tasks
 *
 *
  */
"use strict";

// Dependencies
const crypto = require('crypto');
const config = require('./config');
const https = require('https');
const querystring = require('querystring');
const StringDecoder = require('string_decoder').StringDecoder;
const path = require('path');
const fs = require('fs');
// Container for the helpers
let helpers = {};

// Creates SHA256 hashPasswords
helpers.hash = (str) => {
  if(typeof(str) == 'string' && str.length > 0) {
    let hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// parse a Json string To an Object in all cases without throwing
helpers.parseJsonToObject = (str) => {
  try {
    let object = JSON.parse(str);
    return object;
  } catch (e) {
    return {};
  }
};

// Create a string of random alphanumeric characters, of given length
helpers.createRandomString = (strLength) => {
  strLength = typeof(strLength) === 'number' && strLength > 0 ? strLength : false;
   if(strLength) {
     // Define possible characters for the string
     let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

     // START the string
     let str = '';
     for(let i = 1; i <= strLength; i++) {
       //Get a characters from possibleCharacters
       let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
       //Append this characters to the final string
       str+=randomCharacter;
     }
     return str;
   } else {
     return false;
   }
};

// Charge the custumer using stripe API
// Requiered data: amount, source (token from stripe checkout)
helpers.stripeCharge = (amount,source,callback) => {
  // Validate parameters
  amount = typeof(amount) == 'number' && amount >= 0 ? amount : false;
  source = typeof(source) == 'string' && source.trim().length > 0  ? source.trim() : false;
  if(amount!== false && source){
    // Configure the request payload
    let payload = {
      'amount' : amount,
      'source' : source,
      'currency' : 'try',
      'description' : 'order'
    };
    let stringPayload = querystring.stringify(payload);

    // Configure the request details
    let requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.stripe.com',
      'method' : 'POST',
      'path' : '/v1/charges',
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : `Bearer ${config.strip.secret}`,
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };
    // Instantiate the request object
    let req = https.request(requestDetails,(res) => {});

    req.on('response' ,(res) => {
      let status =  res.statusCode;
      // Get the resonse
      let decoder = new StringDecoder('utf-8');
      let buffer = '';
      res.on('data', (data) => {
        buffer += decoder.write(data);
      });
      res.on('end', () => {
        buffer += decoder.end();
        let resData = helpers.parseJsonToObject(buffer.toString());
        // Callback successfully if the request went through
        if(status == 200 || status == 201){
          callback(false,resData);
        } else {
          callback(400,resData);
        }
      });
    });
  // Bind to the error event so it doesn't get thrown
  req.on('error',(e) => {
    callback(e);
  });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback('Given parameters were missing or invalid');
  }
};

// Send mail via mailgun
// Requiered data: from,subject,text,dest
helpers.sendMailgun = (subject,text,to,callback) => {
  //@TODO validate parameters
  if(true) {
    // Prepare payload
    let payload = {
      'from':`info@${config.mailgun.domain}`,
      'to':to,
      'text':text,
      'subject': subject
    };
    let stringPayload = querystring.stringify(payload);
    let requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.mailgun.net',
      'method' : 'POST',
      'path' : `/v3/${config.mailgun.domain}/messages`,
      'auth': `api:${config.mailgun.apikey}`,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };
    // Instantiate the request object
    let req = https.request(requestDetails,(res) => {});

    req.on('response', (res) => {
      let status =  res.statusCode;
      // Get the resonse
      let decoder = new StringDecoder('utf-8');
      let buffer = '';
      res.on('data', (data) => {
        buffer += decoder.write(data);
      });
      res.on('end', () => {
        buffer += decoder.end();
        let resData = helpers.parseJsonToObject(buffer.toString());
        // Callback successfully if the request went through
        if(status == 200 || status == 201){
          callback(false,resData);
        } else {
          callback(true,resData);
        }
      });
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',(e) => {
      callback(e);
    });
    // Add the payload
    req.write(stringPayload);
    // End the request
    req.end();


  } else {
  callback('Given parameters were missing or invalid');
  }

};

// Get the string content of a template
helpers.getTemplate = (templateName,data,callback) => {
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data =typeof(data) == 'object' && data !== null ? data : {};
  if(templateName) {
    let templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html','utf8',(err,str) => {
      if(!err && str && str.length > 0) {
        // Do interpolation on te string
        let finalString = helpers.interpolate(str,data);
        callback(false,finalString);
      } else {
        console.log(err);
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer and pass provided data object to header and footer for interpolation
helpers.addUniversalTemplates = (str,data,callback) => {
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data =typeof(data) == 'object' && data !== null ? data : {};
  // get the header
  helpers.getTemplate('_header',data,(err,headerString) => {
    if(!err && headerString) {
      // Get the footer
      helpers.getTemplate('_footer',data,(err,footerString) => {
        if(!err && footerString) {
          // add them all together
          let fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }

      });
    } else {
      callback('Could not find the header template');
    }
  });

};

// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = (str,data) => {
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global"
  for(let keyName in config.templateGlobals) {
    if(config.templateGlobals.hasOwnProperty(keyName)){
      data['global.'+keyName] = config.templateGlobals[keyName];
    }
  }

  // for each key in the data object, insert its value into the string at the coressponding placeholder
  for(let key in data) {
    if(data.hasOwnProperty(key) && typeof(data[key]) == 'string') {
      let replace = data[key];
      let find = '{'+key+'}';
      str = str.replace(find,replace);
    }
  }
  return str;
};

// Get the content of a satic (public) assests
helpers.getStaticAsset = (fileName,callback) => {
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName) {
    let publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName,(err,data) => {
      if(!err && data) {
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid file name was not given.');
  }
};

// Export the modules
module.exports = helpers;
