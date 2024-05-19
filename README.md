## Task Management API Documentation

This API provides functionality for a simple task management system, including user authentication, task CRUD operations, and real-time task updates via WebSockets.


## Installation

```bash
$ git clone https://github.com/Temitopesam1/simple-task-management-system.git
$ cd https://github.com/Temitopesam1/simple-task-management-system.git
```

## Environment Variable
Create a .env file in the root directory and add the following environment variables:

MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>



```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Additional Information
Ensure MongoDB is running and accessible.
- Use tools like Postman or Insomnia to test the RESTful API endpoints.
- Use a WebSocket client (like the one in the socket.html example) to test real-time updates.

## Base URL
The base URL for the API is: http://localhost:3000

## Authentication
The API uses JWT tokens for authentication. You must include the JWT token in the Authorization header for all requests to protected endpoints.

## Documentation
[click here to go to documentation](https://documenter.getpostman.com/view/32555272/2sA3QmDEsH).

