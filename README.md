# Homework-Assignment-2
API for a pizza-delivery company

**Pease rename** lib/config.js-CHANGE_ME to lib/config.js and replace
YOUR_STRIPE_SECRET_KEY,
YOUR_MAILGUN_SANDBOX_DOMAIN,
YOUR_MAILGUN_API_KEY,
with your own value.

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


### Create a token or a user
## url: /tokens
### method: POST
Required data: email,password

### Get a token for the user
## url: /tokens
### method: GET
