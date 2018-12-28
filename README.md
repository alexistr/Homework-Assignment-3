# Homework-Assignment-3

# Configuration
Pease rename lib/config.js-CHANGE_ME to lib/config.js and replace
YOUR_STRIPE_SECRET_KEY,
YOUR_STRIPE_PUB_KEY,
YOUR_MAILGUN_DOMAIN,
YOUR_MAILGUN_API_KEY,
with your own values.


The menu is hard coded in lib/menu.js.
Obviously you'll need a stripe and a mailgun account.

# GUI navigation ###

## Signup
### Create an account & login

## Login
### Login to an existing account


## Account Settings (must be loggedin)
### Modify / Delete your account


## Menu (must be loggedin)
### Show the menu / put pizza in your cart


## Your cart (must be loggedin)
### View / remove pizza from your cart and pay



### API documentation ###

# Users
## Create user:
### url: /api/users
### method: POST
Required: firstName, lastName, email, address, password

## Get user details:
### url: /api/users
### method: GET

Required: user email (+authorization token)

## Modify user
### url: /api/users
### method: PUT
Requered data : email (+authorization token)
Optional data : one of firstName, lastName, email, address, password

## Delete a user:
### url: /api/users
### method: DELETE
Required: user email (+authorization token)

# Tokens
## Create a token for a user
### url: /api/tokens
### method: POST
Required data: email,password

### Get a token for the user
## url: /api/tokens
### method: GET
Required data: id (token id)


### Extend a token for the user
## url: /api/tokens
### method: PUT
Required data: id (token id), extend (boolean)

### Delete a token for the user
## url: /api/tokens
### method: DELETE
Required data: id (token id)

# Menu
## Get the available pizzas from the menu
### url: /api/menu
### method: GET
Required data: email (+authorization token)

# Shopping
## Choose pizza and put it in the cart
### url: /api/shopping
### method: POST
Required data: email,pizza (+authorization token)

## Get the content of a user shopping cart
### url: /api/shopping
### method: GET
Required data: email (+authorization token)

## Delete one pizza from a user 's cart
### url: /api/shopping
### method: PUT
Required data: email,pizza (+authorization token)

# Order
## pay for the pizza in the cart
### url: /api/order
### method: POST
Required data: email,stripeToken (use tok_visa for testing) (+authorization token)

## Retrieve all the orders for a user
### url: /api/order
### method: GET
Required data: email (+authorization token)

# Config
### url: /api/config
### method: GET
Required data: none
