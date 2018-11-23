# Homework-Assignment-2
API for a pizza-delivery company

**Pease rename** lib/config.js-CHANGE_ME to lib/config.js and replace
YOUR_STRIPE_SECRET_KEY,
YOUR_MAILGUN_SANDBOX_DOMAIN,
YOUR_MAILGUN_API_KEY,
with your own values.

# Users
## Create user:
### url: /users
### method: POST
Required: firstName, lastName, email, address, password

## Get user details:
### url: /users
### method: GET

Required: user email (+authorization token)

## Modify user
### url: /users
### method: PUT
Requered data : email (+authorization token)
Optional data : one of firstName, lastName, email, address, password

## Delete a user:
### url: /users
### method: DELETE
Required: user email (+authorization token)

# Tokens
## Create a token or a user
### url: /tokens
### method: POST
Required data: email,password

### Get a token for the user
## url: /tokens
### method: GET
Required data: id (token id)


### Extend a token for the user
## url: /tokens
### method: PUT
Required data: id (token id), extend (boolean)

### Delete a token for the user
## url: /tokens
### method: DELETE
Required data: id (token id)

# Menu
## Get the avalaible pizza from the menu
### url: /menu
### method: GET
Required data: authorization token

# Shopping
## Choose pizza and put it in the cart
### url: /shopping
### method: POST
Required data: email,pizza (+authorization token)

## Get the content of a user shopping cart
### url: /shopping
### method: GET
Required data: email (+authorization token)

## Delete one pizza from a user 's cart
### url: /shopping
### method: PUT
Required data: email,pizza (+authorization token)

# Order
## pay for the pizza in the cart
### url: /order
### method: POST
Required data: email,stripeToken (use tok_visa for testing) (+authorization token)

## Retrieve all the orders for a custumer
### url: /order
### method: GET
Required data: email (+authorization token)
