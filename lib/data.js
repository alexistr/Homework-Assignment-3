/*
 * lib for storing and editing data
 *
*/
"use strict";
//dependencies
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');


//Container for the module (to be exported)
let lib = {};

//base directory of the data
lib.baseDir = path.join(__dirname,'/../.data/');

//Write data to a file
lib.create = (dir,file,data,callback) => {
  //Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err,fileDescriptor) => {
    if(!err && fileDescriptor) {
      //Convert data to a string
      let stringData = JSON.stringify(data);
      //write to file
      fs.write(fileDescriptor,stringData, (err) => {
        if(!err) {
          fs.close(fileDescriptor, (err) => {
            if(!err) {
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });

        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    };
  });

};

//Read data inside a file
lib.read = (dir,file,callback) => {
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf-8',(err,data) => {
    if(!err && data) {
      let parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
    callback(err,data);
  }
  });
};

//Update data from file
lib.update = (dir,file,data,callback) => {
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+', (err,fileDescriptor) => {
    if(!err && fileDescriptor) {
      //concvert data to string
      let stringData = JSON.stringify(data);
      fs.truncate(fileDescriptor, (err) => {
        if(!err) {
          fs.write(fileDescriptor,stringData, (err) => {
            if(!err) {
              fs.close(fileDescriptor, (err) => {
                if(!err) {
                  callback(false);
                } else {
                  callback('Error closing the file');
                }
               });

            } else {
              callback('Error writing to the file');
            }
          });
        } else {
          callback('Error trunkating file');
        }
      });

    } else {
      callback('Could not create new file, it may not exist yet');
    }
  });
};
//Delete a file
lib.delete = (dir,file,callback) => {
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err) => {
    if(!err) {
      callback(false);
    } else {
      callback('Error deleting the file');
    }
  });
};

//list all the items in a directory
lib.list = (dir,callback) => {
  fs.readdir(lib.baseDir+dir+'/',(err,data) => {
    if(!err && data && data.length > 0) {
      let trimmedFileNames = [];
      data.forEach((filname) => {
        trimmedFileNames.push(filname.replace('.json',''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};
//exports
module.exports = lib;
