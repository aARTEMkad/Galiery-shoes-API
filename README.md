# Galiery-shoes
## Information
API for shoe store to be able to add remove edit shoes send email and user authorization

## What is required for the API
The .env file in which there is:

```js
PORT = 
CONNECT_DB =

# gmail and password for nodemailer which will be send email
GMAIL = 
PASS = 

# key for encryption jwt tokens
ACCESS_JWT_TOKEN_KEY = 
REFRESH_JWT_TOKEN_KEY = 

# salt for encryption password
SALT = 
```

Node.js needs to be installed
```
node.js v18.17.1(minimal)
```

## How start API
To run the project, you need an .env file and installed node.js

##### 1.
Copy git repositories:
```
git clone https://github.com/aARTEMkad/Galiery-shoes-API
``` 

##### 2.
install all modules:
```
npm install
```

##### 3.
launch the project for development:
```
npm run startdev
```

2 method:
```
node main.js
```