# User and Home API

This project implements a RESTful API for managing users and their homes using Node.js, Express, and Swagger for API documentation.

## Installation

Before running the project, ensure you have Node.js and npm installed on your machine.

### Clone the repository:

`git clone <repository_url>`

Install dependencies:

`cd UserHomeApi`

`npm install`


## Running the Server

To start the server, run the following command:

`npm run start`

The server will start running at http://localhost:3000.

## API Documentation

API endpoints are documented using Swagger UI. You can access the Swagger documentation at:

http://localhost:3000/api-docs/

Swagger UI provides an interactive interface where you can:

View all available endpoints
Test each endpoint with different parameters
See sample requests and responses

### Endpoints
```
Users
GET /users: Get all users.
GET /users/{userId}: Get a single user by ID.
POST /users: Create a new user.
Request body schema:
json

{
  "name": "string",
  "email": "string"
}
PATCH /users/{userId}: Partially update a user by ID.
Request body schema:
json

{
  "name": "string",
  "email": "string"
}
PUT /users/{userId}: Update a user completely by ID.
Request body schema:
json

{
  "name": "string",
  "email": "string"
}
DELETE /users/{userId}: Delete a user by ID.
Homes
GET /users/{userId}/homes: Get all homes of a user.
Query parameters: city, street, country for filtering.
POST /users/{userId}/homes: Create a new home for a user.
Request body schema:
json

{
  "city": "string",
  "street": "string",
  "country": "string"
}
PUT /users/{userId}/homes/{homeId}: Update a home of a user by ID.
Request body schema:
json

{
  "city": "string",
  "street": "string",
  "country": "string"
}
DELETE /users/{userId}/homes/{homeId}: Delete a home of a user by ID.
Usage
GET /users:

Retrieves a list of all users.
POST /users:

Creates a new user with the specified name and email.
GET /users/{userId}:

Retrieves details of a specific user identified by userId.
PATCH /users/{userId}:

Updates specific fields of a user identified by userId.
PUT /users/{userId}:

Updates all fields of a user identified by userId.
DELETE /users/{userId}:

Deletes a user identified by userId, if they have no homes associated.
GET /users/{userId}/homes:

Retrieves all homes of a user identified by userId, optionally filtered by city, street, or country.
POST /users/{userId}/homes:

Creates a new home for the user identified by userId.
PUT /users/{userId}/homes/{homeId}:

Updates details of a home identified by homeId belonging to the user identified by userId.
DELETE /users/{userId}/homes/{homeId}:

Deletes a home identified by homeId belonging to the user identified by userId.

Using only PUT to host updates simplifies the update logic on the server as there is no need to handle partial updates.
All fields in the resource are updated at once, which can reduce complexity and potential errors in deployment.
PATCH is useful for minor and frequent updates, as it allows only parts of the resource to be modified,
which can be more efficient and flexible. But in this case the addresses of the homes do not undergo constant modifications.
That is why it was considered to perform a PUT of the houses and not a PATCH.

```
