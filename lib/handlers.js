/*
 *
 * Request handlers
 *
 */

"use strict";

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');
const menu = require('./menu');

//Define the handlers
let handlers = {};

/*
* HTML handlers
*
*/
handlers.index = (data,callback) => {
  //Reject any request tha isn't a GET
  if(data.method == 'get') {

    // prepare data for interpolation
    let templateData = {
      'head.title' : 'Don Pietro - Orginal Italyan Pizza',
      'head.description' : 'We\'re selling the best Italyan pizza in town',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,(err,str) => {
    if(!err && str) {
        helpers.addUniversalTemplates(str , templateData,(err,str) =>{
          if(!err && str) {
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }

};

handlers.accountCreate = (data,callback) => {
  //Reject any request tha isn't a GET
  if(data.method == 'get') {

    // prepare data for interpolation
    let templateData = {
      'head.title' : 'Signeup for pizzas',
      'head.description' : 'Quick and delicious',
      'body.class' : 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate',templateData,(err,str) => {
    if(!err && str) {
        helpers.addUniversalTemplates(str , templateData,(err,str) =>{
          if(!err && str) {
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};
handlers.sessionCreate = (data,callback) => {
  //Reject any request tha isn't a GET
  if(data.method == 'get') {
    // prepare data for interpolation
    let templateData = {
      'head.title' : 'Signeup for pizzas',
      'head.description' : 'login',
      'body.class' : 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,(err,str) => {
    if(!err && str) {
        helpers.addUniversalTemplates(str , templateData,(err,str) =>{
          if(!err && str) {
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

handlers.accountEdit = (data,callback) => {
  //Reject any request tha isn't a GET
  if(data.method == 'get') {
    // prepare data for interpolation
    let templateData = {
      'head.title' : 'Signeup for pizzas',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,(err,str) => {
    if(!err && str) {
        helpers.addUniversalTemplates(str , templateData,(err,str) =>{
          if(!err && str) {
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};
handlers.accountDeleted = (data,callback) => {
  //Reject any request tha isn't a GET
  if(data.method == 'get') {
    // prepare data for interpolation
    let templateData = {
      'head.title' : 'Signeup for pizzas',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,(err,str) => {
    if(!err && str) {
        helpers.addUniversalTemplates(str , templateData,(err,str) =>{
          if(!err && str) {
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};
handlers.sessionDeleted = (data,callback) => {
  //Reject any request tha isn't a GET
  if(data.method == 'get') {
    // prepare data for interpolation
    let templateData = {
      'head.title' : 'Signeup for pizzas',
      'head.description' : 'logged out',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,(err,str) => {
    if(!err && str) {
        helpers.addUniversalTemplates(str , templateData,(err,str) =>{
          if(!err && str) {
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};
// favicon
handlers.favicon = (data,callback)=>{
  //Reject any request tha isn't a GET
  if(data.method == 'get') {
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',(err,data) => {
      if(!err && data) {
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assests
handlers.public = (data,callback) => {
  //Reject any request tha isn't a GET
  if(data.method == 'get') {
    // get the file name being requested
    let trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0) {
      //Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, (err,data) => {
        if(!err && data) {
          //determine the conenet type default to plain text
          let contentType = 'plain';
          if(trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }
          if(trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }
          if(trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }
          if(trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }
          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
} else {
  callback(405);
  }
};

/*
* JSON API handlers
*
*/

// Not found handler
handlers.notFound = (data,callback) => {
  callback(404);
};

// Service User
handlers.users = (data,callback) => {
  let acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1 ) {
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for user's submethods
handlers._users = {};

// users - post
// Required data : firstName, lastName, email, address, password
// Optional data : none
handlers._users.post = (data,callback) => {
  // Validate the posted payload
  let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
  let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
  let address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address : false;
  let email = typeof(data.payload.email) == 'string' && data.payload.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ? data.payload.email : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
  if(firstName && lastName && address && email && password) {
    // Check the user does not exists already
    _data.read('users',email,(err , userData) => {
      if(err) {
        //hash the password
        let hashedPassword = helpers.hash(password);
        if (hashedPassword) {
          // prepare the users data
          userData = {
            'firstName': firstName,
            'lastName' : lastName,
            'address' : address,
            'email' : email,
            'hashedPassword' : hashedPassword
          };
          // save the new users
          _data.create('users', email , userData , (err) => {
            if(!err) {
                callback(200);
            } else {
              callback(500,{"Error": "Could not store the new user"});
            }
          });

        } else {
          callback(500 , {"Error": "Could not hash password"});
        }
      } else {
        callback(400,{"Error":"This user already exists"});
      }
    });
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};
// users - get
// Required data : email
// Optional data : none
handlers._users.get = (data,callback) => {
  //Validate input
  let email = typeof(data.queryStringObject) == 'object' && typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ?  data.queryStringObject.email : false;
  if(email) {
    // Get token from the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given tokens is valid for the email
    handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
      if(tokenIsValid) {
        // Search and read the user data
        _data.read("users",email,(err,userData)=>{
          if(!err && userData) {
            // delete the hashed password
            delete userData.hashedPassword;
            // send back the user data
            callback(200,userData);
          } else {
            callback(404,{"Error":"The user does not exists"});
          }
        });
      } else {
        callback(403,{"Error": "missing required token or invalid token for the user"});
      }
    });
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};
// users - put
// Required data : email
// Optional data : one of firstName, lastName, email, address, password
handlers._users.put = (data,callback) => {
  // Validate the payload
  let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
  let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
  let address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address : false;
  let email = typeof(data.payload.email) == 'string' && data.payload.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ? data.payload.email : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
  //Check for required field
  if(email) {
    //Check for Optional fields
    if(firstName || lastName || address || email || password) {
      let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given tokens is valid for the email
      handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
        if(tokenIsValid) {
          // search and read user data from collection
          _data.read('users',email,(err,userData) => {
            // Update the values if needed
            if(!err && userData) {
              userData.firstName = firstName ? firstName : userData.firstName;
              userData.lastName = lastName ? lastName : userData.lastName;
              userData.address = address ? address : userData.address;
              if(password) {
                let hashedPassword = helpers.hash(password);
                userData.hashedPassword = hashedPassword ?  hashedPassword : userData.hashedPassword;
              }
              // Store the modified userData
              _data.update('users',email,userData,(err) => {
                if(!err) {
                  callback(200);
                } else {
                  callback(500,{"Error":"Could not updating user data"});
                }
              });
            } else {
              callback(404,{"Error":"The user does not exists"});
            }
          });

        } else {
          callback(403,{"Error": "missing required token or invalid token for the user"});
        }
      });
        } else {
          callback(400 , {"Error":"At least one Optional field must be sent"});
    }
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};
// users - delete
// Required data : email
// Optional data : none
handlers._users.delete = (data,callback) => {
  //Validate input
  let email = typeof(data.queryStringObject) == 'object' && typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ?  data.queryStringObject.email : false;
  if(email) {
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given tokens is valid for the email
    handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
      if(tokenIsValid) {
        // Delete the user
        _data.delete('users',email,(err) => {
          if(!err) {
            callback(200);
          } else {
            callback(500,{"Error":"Could not deleting user data"});
          }
        });
      } else {
        callback(403,{"Error": "missing required token or invalid token for the user"});
      }
  });
} else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }

};

// Tokens
handlers.tokens = (data,callback) => {
  let acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1 ) {
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for tokenss submethods
handlers._tokens = {};

// Verify if a given token id is currently valid for a given users
handlers._tokens.verifyToken = (id,email,callback) => {
  // Lookup the token
  _data.read('tokens',id, (err,tokenData) => {
    if(!err && tokenData) {
      // Check that te token is for the given user and has not expired
        if(tokenData.email == email && tokenData.expires > Date.now()) {
          callback(true);
        } else {
          callback(false);
        }
      } else {
        callback(false);
      }
    });
 };

// tokens - post
// Required data: email,password
// Optional data: none
handlers._tokens.post = (data,callback) => {
  // validate posted data
  let email = typeof(data.payload.email) == 'string' && data.payload.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ? data.payload.email : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;

  if(email && password) {
    // Search user and read his data
    _data.read('users',email,(err,userData) => {
      if(!err && userData) {
        let hashedPassword = helpers.hash(password);
        if(userData.hashedPassword === hashedPassword ) {
          // create random token + expiration date 1h later
          let tokenId = helpers.createRandomString(20);
          let expires = Date.now() + 1000 * 60 * 60;
          //Create token
          let tokenObject = {
            'email' : email,
            'id' : tokenId,
            'expires' : expires,
          };
          // store the tokenId
          _data.create('tokens',tokenObject.id,tokenObject,(err) => {
            if(!err) {
              callback(200,tokenObject);
            } else {
              callback(500,{"Error":"Could not create the tokens"});
            }
          });

        } else {
            callback(400,{"Error" : "password did not match the specified user store password"});
        }
      } else {
          callback(404,{"Error": "The user does not exists"});
      }
    });

  } else {
    callback(400,{"Error" : "Missing required fields"});
  }
};

// token get
// Required data: id
// Optional data: none
handlers._tokens.get = (data,callback) => {
  // validate id
  let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id : false;
  if(id) {
    // search and read token data
    _data.read('tokens',id,(err,tokenData) => {
      if(!err && tokenData) {
        callback(200,tokenData);
      } else {
        callback(500,{"Error":"Could not find token data"});
      }
    });
  } else {
    callback(400,{"Error" : "Missing required fields or invalid"});
  }
};

// token - put
// Required data: id, extend
// Optionaldata: none
handlers._tokens.put = (data,callback) => {
  // Validate data
  let id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id : false;
  let extend = typeof(data.payload.extend) == 'boolean' ? data.payload.extend : false ;
  if(id && extend) {
    // Search and read the token data
    _data.read('tokens',id,(err,tokenData) => {
      if(!err && tokenData) {
        // Verify the token is not already expired
        if(tokenData.expires > Date.now()) {
          // Extend the token by 1 houre
          tokenData.expires =+ 1000 * 60 * 60;
          // Store the modified token
        _data.update('tokens',id,tokenData,(err) => {
          if(!err) {
            callback(200);
          } else {
            callback(500,{"Error":"Could not save the extended token"});
          }
        });

        } else {
          callback(400,{"Error" : "The token is already expired and can not be extended"});
        }
      } else {
        callback(404,{"Error":"Could not find token data"});
      }
    });
  } else {
    callback(400,{"Error" : "Missing required fields or invalid"});
  }
};

// token - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = (data,callback) => {
  // Validate id
  let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id : false;
  if(id) {
    // search and read token data
    _data.delete('tokens',id,(err) => {
      if(!err) {
        callback(200);
      } else {
        callback(404,{"Error":"Could not delete the token"});
      }
    });
  } else {
    callback(400,{"Error" : "Missing required fields or invalid"});
  }

};

// menu
handlers.menu = (data,callback) => {
  let acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1 ) {
    handlers._menu[data.method](data,callback);
  } else {
    callback(405);
  }
};
// Container for the menu handlers
handlers._menu = {};
// menu - get
// Required data: email
// Optional data: none
handlers._menu.get = (data,callback) => {
  //Validate input
  let email = typeof(data.queryStringObject) == 'object' && typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ?  data.queryStringObject.email : false;
  if(email) {
    // Get token from the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given tokens is valid for the email
    handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
      if(tokenIsValid) {
        // send back the menu
        callback(200,menu);
      } else {
        callback(403,{"Error": "missing required token or invalid token for the user"});
      }
    });
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};
handlers._menu.verifyPizza = (pizza,callback) => {
  //Search the pizza in the menu
  let pizzaExists = false;
  for(let pizzaObj of menu) {
      if(pizza == pizzaObj.pizza) {
        pizzaExists = pizzaObj;
        break;
      }
    }
    callback(pizzaExists);
  };


// shopping
handlers.shopping = (data,callback) => {
  let acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1 ) {
    handlers._shopping[data.method](data,callback);
  } else {
    callback(405);
  }
};
//Container for the shopping handlers
handlers._shopping = {};

// shopping - post
// Required data: email,pizza
// Optional data: none
handlers._shopping.post = (data,callback) => {
  // Validate posted payload
  let email = typeof(data.payload.email) == 'string' && data.payload.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ? data.payload.email : false;
  let pizza = typeof(data.payload.pizza) == 'string' ? data.payload.pizza : false;
  if(email && pizza) {
    // check the user exists
    _data.read('users',email,(err,userData) => {
      if(!err && userData) {
        // Get token from the headers
        let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given tokens is valid for the email
        handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
          if(tokenIsValid) {
            // Check the Required pizza exists in the menu
              handlers._menu.verifyPizza(pizza, (pizzaExists) => {
                if(pizzaExists) {
                  // get the user's shopping cart
                  let cart = userData.cart ? userData.cart : [];
                  // add the pizza to the cart
                  cart.push(pizzaExists);
                  // Save the user new cart
                  userData.cart = cart;
                  _data.update('users',userData.email,userData,(err) => {
                    if(!err) {
                      callback(200);
                    } else {
                      callback(500,{"Error":"Could not save the user cart"});
                    }
                  });
                } else {
                  callback(404,{"Error": "The required pizza is not avalaible"});
                }
             });
          } else {
              callback(403,{"Error": "missing required token or invalid token for the user"});
          }
        });
      } else {
        callback(404 , {"Error":"The user could not been found"});
      }
    });
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};


// shopping - get
// Required data: email
// Optional data: none
handlers._shopping.get = (data,callback) => {
  //Validate input
  let email = typeof(data.queryStringObject) == 'object' && typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ?  data.queryStringObject.email : false;
  if(email) {
    // Get token from the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given tokens is valid for the email
    handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
      if(tokenIsValid) {
        // Search and read the user data
        _data.read('users',email,(err,userData) => {
          if(!err && userData && userData.cart) {
            callback(200,userData.cart);
          } else {
            callback(404,{"Error":"no cart found for this user"});
          }
        });
      } else {
        callback(403,{"Error": "missing required token or invalid token for the user"});
      }
    });
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};

// shopping - put
// Required data: email,pizza
// Optional data: none
handlers._shopping.put = (data,callback) => {
  // Validate posted payload
  let email = typeof(data.payload.email) == 'string' && data.payload.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ? data.payload.email : false;
  let pizza = typeof(data.payload.pizza) == 'string' ? data.payload.pizza : false;
  if(email && pizza) {
    // Get token from the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given tokens is valid for the email
    handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
        if(tokenIsValid) {
          // get the pizza object from the menu
          handlers._menu.verifyPizza(pizza,(pizzaObj)=> {
          if(pizzaObj) {
            // get user cart
            _data.read('users',email,(err,userData)=>{
              if(!err && userData && userData.cart) {
                // Remove the pizza from the user cart
                let checkPosition = userData.cart.findIndex(pizza => pizza.pizza == pizzaObj.pizza);
              if(checkPosition > -1) {
                  userData.cart.splice(checkPosition,1);
                  // Save the new cart Content
                  _data.update('users',email,userData,(err) => {
                    if(!err) {
                      callback(200);
                    } else {
                      callback(500,{"Error":"Could not update the user cart"});
                    }
                  });
                } else {
                  callback(404,{"Error":"the pizza was not found in te user cart"});
                }
              } else {
                callback(404,{"Error":"no cart found for this user"});
              }
            });
          } else {
            callback(404,{"Error":"The pizza does not exists in the menu"});
          }
        });
      } else {
        callback(403,{"Error": "missing required token or invalid token for the user"});
      }
    });
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};


// Order
handlers.order = (data,callback) => {
  let acceptableMethods = ['get','post'];
  if(acceptableMethods.indexOf(data.method) > -1 ) {
    handlers._order[data.method](data,callback);
  } else {
    callback(405);
  }
};
// Container for the order handlers
handlers._order = {};

// order - POST
// Required data: email,stripeToken
// Optional data: none
// calculate amount
handlers._order.post = (data,callback) => {
  let email = typeof(data.payload.email) == 'string' && data.payload.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ? data.payload.email : false;
  let stripeToken = typeof(data.payload.stripeToken) == 'string' ? data.payload.stripeToken : false;
  if(email ) {
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given tokens is valid for the email
    handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
        if(tokenIsValid) {
          // Load the user'cart
          _data.read('users',email,(err,userData)=> {
            if(!err && userData) {
              // Calculate the amount of the order
              let amount = userData.cart.reduce( (amount,pizza) => amount + pizza.price ,0  );
              // Convert to in smallest currency unit (=> x100)
              amount *= 100;
              helpers.stripeCharge(amount,stripeToken,(err,stripeData) => {
                if(!err) {
                  // Make a new order
                  let orderId = helpers.createRandomString(20);
                  // Prepare order obj for saving
                  let orderObj = {
                    "id" : orderId,
                    "email" : userData.email,
                    "cart" : userData.cart,
                    "amount" : stripeData.amount,
                    "currency" : stripeData.currency,
                    "source" : stripeData.source
                  };
                  //Save the order
                  _data.create('orders',orderId,orderObj,(err) => {
                    if(!err) {
                      // Empty the user's cart
                      userData.cart = [];
                      // Attribute the order to the user
                      userData.orders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];
                      userData.orders.push(orderId);
                      // save the modified user data
                      _data.update('users',userData.email,userData,(err) => {
                        if(!err) {
                          // send receipt
                            let text = `You've just payed ${orderObj.amount/100} TL`;
                            helpers.sendMailgun('Your pizza order', text,userData.email,(err,mailgunData)=> {
                              if(!err) {
                                callback(200);
                              } else {
                                callback(500,mailgunData);
                              }
                            });
                        } else {
                          callback(500,{"Error":"Could not update the user data"});
                        }
                      });
                    } else {
                      callback(500,{"Error":"Could not save the order"});
                    }
                  });
                } else {
                  callback(400,{"Error":`Could not charge the amount of ${amount/100} to the token ${stripeToken}. The error from stripe was: ${stripeData.error.message}`});
                }
              });
            } else {
              callback(500,{"Error":"Could not get the user's cart"});
            }
          });
        } else {
          callback(403,{"Error": "missing required token or invalid token for the user"});
        }
    });
  } else {
    callback(400 , {"Error":"Missing required fields or invalid"});
  }
};

// order - get
// Required data: email
// Optional data: none
handlers._order.get = (data,callback) => {
  //Validate input
  let email = typeof(data.queryStringObject) == 'object' && typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ?  data.queryStringObject.email : false;
  if(email) {
    // Get token from the headers
    let token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given tokens is valid for the email
      handlers._tokens.verifyToken(token,email,(tokenIsValid) => {
        if(tokenIsValid) {
          // get user orders from userData
          _data.read('users',email,(err,userData) => {
            if(!err && userData) {
              let orders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];
              let ordersDetail = [];
              let errFlag = false;
              // get details orders form orders collection
              orders.forEach((orderId,idx) => {
                _data.read('orders',orderId,(err,orderData) => {
                  if(!err && orderData) {
                    ordersDetail.push(orderData);
                    //callback when finished
                    if(orders.length == idx + 1 ) {
                      callback(200,ordersDetail);
                    }
                  } else {
                    callback(500,{"Error":"Could not read one of the users's order details"});
                  }
                });
              });
            } else {
              callback(500,{"Error":"Could not read user details"});
            }
          });
        } else {
          callback(403,{"Error": "missing required token or invalid token for the user"});
        }
      });
    } else {
      callback(400 , {"Error":"Missing required fields or invalid"});
      }
};

// Ping handlers
handlers.ping = (data,callback) => {
 callback(200);
};

module.exports = handlers;
