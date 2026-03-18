# Online Book Review Application - Complete Implementation

## Project Overview

This is a full-stack online book review application built with Node.js and Express.js. It provides REST API endpoints for managing books and reviews with user authentication and authorization.

## Technology Stack

- **Backend Framework**: Express.js 4.18.1
- **Authentication**: JWT (jsonwebtoken) + Express Session
- **Development Server**: Nodemon 2.0.19
- **HTTP Client**: Axios 1.4.0
- **Runtime**: Node.js

## Features Implemented

### 1. Public Endpoints (General Routes)

- **GET /**: Retrieve all available books
- **POST /register**: Register new user with username and password
- **GET /isbn/:isbn**: Search books by ISBN using async/await
- **GET /author/:author**: Filter books by author using async/await
- **GET /title/:title**: Filter books by title using async/await
- **GET /review/:isbn**: Get all reviews for a specific book

### 2. Authenticated Endpoints (Customer Routes)

- **POST /customer/login**: User login with session creation and JWT token generation
- **PUT /customer/auth/review/:isbn**: Add or modify a book review (authenticated users only)
- **DELETE /customer/auth/review/:isbn**: Delete a review (users can only delete their own)

### 3. Authentication Mechanism

- Session-based authentication using express-session
- JWT token generation for secure token-based access
- Middleware to protect authenticated routes
- User registration and login validation
- Password-based authentication with user records

### 4. Multi-User Support

- Multiple users can register and login simultaneously
- Each user can have their own reviews
- Multiple users can review the same book
- Users can only modify/delete their own reviews
- Real-time access to all reviews from different users

## API Implementation Details

### Registration (POST /register)

```
Request: POST /register
Headers: Content-Type: application/json
Body: {"username": "user1", "password": "pass123"}
Response: {"message": "User successfully registered. Now you can login"}
```

### Login (POST /customer/login)

```
Request: POST /customer/login
Headers: Content-Type: application/json
Body: {"username": "user1", "password": "pass123"}
Response: {"message": "User successfully logged in"}
Session: Stores authorization token for subsequent requests
```

### Get All Books (GET /)

```
Request: GET /
Response: Array of all books with details and reviews
Uses: Async/await with Promise.resolve()
```

### Get Book by ISBN (GET /isbn/:isbn)

```
Request: GET /isbn/9780141439570
Response: Single book object with ISBN matching
Uses: Async/await with filter operation
```

### Get Books by Author (GET /author/:author)

```
Request: GET /author/Jane%20Austen
Response: Array of books by specified author
Uses: Async/await with filtered array
```

### Get Books by Title (GET /title/:title)

```
Request: GET /title/Pride%20and%20Prejudice
Response: Array of books with matching title
Uses: Async/await with filtered array
```

### Get Reviews (GET /review/:isbn)

```
Request: GET /review/9780141439570
Response: Object containing user reviews for the book
Example: {"user1": "Great book!", "user2": "Loved it!"}
```

### Add/Modify Review (PUT /customer/auth/review/:isbn)

```
Request: PUT /customer/auth/review/9780141439570
Headers: Content-Type: application/json
Body: {"review": "Excellent book!"}
Response: {"message": "Review successfully posted", "reviews": {...}}
Requires: Active session and JWT token authentication
```

### Delete Review (DELETE /customer/auth/review/:isbn)

```
Request: DELETE /customer/auth/review/9780141439570
Response: {"message": "Review successfully deleted", "reviews": {...}}
Requires: Active session and JWT token authentication
Restriction: Users can only delete their own reviews
```

## Database Structure

### Books Database

```javascript
{
  1: {
    "isbn": "9780141439570",
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {
      "user1": "Review text here",
      "user2": "Another review"
    }
  },
  // ... more books
}
```

### Users Database

```
Array of registered users:
[
  {"username": "user1", "password": "pass123"},
  {"username": "user2", "password": "pass456"}
]
```

## Authentication Flow

1. **User Registration**: POST to /register with username and password
   - Validates if username is unique (isValid function)
   - Stores user in users array

2. **User Login**: POST to /customer/login with credentials
   - Authenticates user using authenticatedUser function
   - Creates JWT token with expiration time (1 hour)
   - Stores authorization token in session

3. **Protected Routes**: All /customer/auth/\* routes
   - Middleware checks for session.authorization token
   - Verifies JWT token signature
   - Grants/denies access based on token validity

4. **Review Management**: Only authenticated users
   - Extract username from session.authorization
   - Associate reviews with logged-in user
   - Only allow users to modify/delete their own reviews

## Code Quality

- Async/await patterns used throughout for better readability
- Promise-based operations for asynchronous handling
- Proper error handling with meaningful HTTP status codes
- Input validation for required fields
- Clear message responses for all operations
- Session management for stateful authentication
- JWT tokens for enhanced security

## Testing

All endpoints have been tested with cURL commands demonstrating:

- Successful user registration
- User login and session creation
- Retrieving books with various filters
- Adding reviews as authenticated users
- Multi-user simultaneous access
- Review modification and deletion
- Proper error handling for invalid requests

## Performance Considerations

- In-memory data storage for fast access
- Asynchronous operations prevent blocking
- Session-based authentication for quick user context
- JWT tokens for stateless verification capability

## Security Implementation

- Session-based access control
- JWT token validation for protected routes
- Password storage (in production, would use bcrypt)
- User ownership verification for review modifications
- HTTP status codes for proper security responses

## Multi-User Concurrent Access

The application supports multiple users accessing simultaneously:

- Each user has independent session
- Reviews are stored in shared book objects
- Multiple users can review the same book
- Each user can only manage their own reviews
- Real-time visibility of all reviews

## Project Files

- `final_project/index.js`: Main Express server configuration
- `final_project/router/general.js`: Public routes with async/await implementation
- `final_project/router/auth_users.js`: Authentication and protected routes
- `final_project/router/booksdb.js`: Books database with ISBN information
- `final_project/package.json`: Project dependencies configuration
