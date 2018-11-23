# Homework-Assignment-2
API for a pizza-delivery company

Pease rename lib/config.js-CHANGE_ME to lib/config.js and replace
YOUR_STRIPE_SECRET_KEY,
YOUR_MAILGUN_SANDBOX_DOMAIN,
YOUR_MAILGUN_API_KEY,
with your own value.

*Create user*:
users/post
Required: firstName, lastName, email, address, password

Get user details:
users/get
Requiered: user email (+authorization token)

Modify user
users/put
Requiered data : email (+authorization token)
Optional data : one of firstName, lastName, email, address, password
