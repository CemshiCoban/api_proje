# Currency Converter API

The Currency Converter API is a Node.js project developed to practice JavaScript skills and interact with different APIs. It provides functionalities to convert currencies based on historical exchange rates retrieved from the Free Currency API, generate motivational financial quotes using the OpenAI API, and store the request data in a MongoDB database.

## Features

- **Currency Conversion:** Convert currencies based on historical exchange rates retrieved from the Free Currency API.

- **Quote Generation:** Generate motivational financial quotes using the OpenAI API.
  
- **Database Integration:** Store request information in a MongoDB database using Mongoose.
  
- **User Authentication:** Register and login functionality using JSON Web Tokens (JWT) for secure access to the API endpoints.

## Endpoints

| Endpoint                 | Method | Description                                  |
| ------------------------ | ------ | -------------------------------------------- |
| /auth/register           | POST   | Register a new user                          |
| /auth/login              | POST   | Login with username and password             |
| /currencyConvert/convert | POST   | Convert currencies based on historical rates |

## Usage

### User Authentication

The API provides endpoints for user registration and login, utilizing JSON Web Tokens (JWT) for authentication. This ensures secure access to the API endpoints and allows users to perform currency conversion actions while logged in.

#### Register User

Send a POST request to `/auth/register` with the following parameters in the request body:

- `username`: The username for the new user.
- `password`: The password for the new user.

Upon successful registration, a unique JWT will be generated and returned in the response.

#### Example Register Request
```HTTP
POST /auth/register 
Content-Type: application/json

{ 
"username": "example_user", 
"password": "example_password" 
}
```

#### Login User

Send a POST request to `/auth/login` with the following parameters in the request body:

- `username`: The username of the user.
- `password`: The password of the user.

Upon successful login, a unique JWT will be generated and returned in the response.

#### Example Login Request

```HTTP
POST /auth/login 
Content-Type: application/json

{ 
"username": "example_user", 
"password": "example_password" 
}
```

**NOTE :** The JWT token received from the login request should be included in the `Authorization` header of subsequent requests to authenticated endpoints for currency conversion.

### Convert Currency

Send a POST request to `/currencyConvert/convert` with the following parameters in the request body:

- `date`: The date for which you want to retrieve historical exchange rates.
- `base_currency`: The currency to convert from.
- `currencies`: The currency to convert to.

### Example Request
```http
POST /currencyConvert/convert
Content-Type: application/json
Authorization: JWT_Token

{
  "date": "2024-03-21",
  "base_currency": "USD",
  "currencies": "TRY"
}
```

### Example Response

```json
{
  "base_currency": "USD",
  "target_currency": "TRY",
  "date": "2024-03-21",
  "value": 32.4823144548,
  "quote": "An investment in knowledge pays the best interest. — Benjamin Franklin",
  "user": "example_user"
}
```

### Database Structure

The response is saved to the database with the following structure:

```json
{
  "_id": "ObjectId('id')",
  "base_currency": "USD",
  "target_currency": "TRY",
  "date": "2024-03-21T00:00:00.000+00:00",
  "value": 32.4823144548,
  "quote": "\"Do not save what is left after spending, but spend what is left after…\"",
  "user": "ObjectId('id')",
  "__v": 0
}
```
