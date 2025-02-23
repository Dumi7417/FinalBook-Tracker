# Book Tracker API

## Project Overview

Book Tracker is a RESTful API that allows users to register, log in, and manage their book collection. Users can add books, update book details, delete books, and retrieve their book lists. The project implements authentication using JWT and enforces Role-Based Access Control (RBAC) to differentiate between regular users and admins.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token) for authentication
- bcrypt for password hashing

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/book-tracker.git
   cd book-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   PORT=5002
   MONGODB_URI=mongodb://localhost:27017/book-tracker
   JWT_SECRET=my_super_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Documentation

### Authentication Endpoints

#### Register a new user

**POST /api/users/register**

```json
{
  "username": "User",
  "email": "user@example.com",
  "password": "123456"
}
```

#### Log in

**POST /api/users/login**

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

_Response:_

```json
{
  "token": "your_jwt_token"
}
```

### User Management Endpoints (Protected)

#### Get user profile

**GET /api/users/profile**
_Headers:_ `{ Authorization: Bearer <token> }`

#### Update user profile

**PUT /api/users/profile**

```json
{
  "username": "New Name",
  "email": "newemail@example.com"
}
```

### Book Management Endpoints (Protected)

#### Add a new book

**POST /api/books**

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "status": "Reading"
}
```

#### Get all books for logged-in user

**GET /api/books**

#### Get a specific book by ID

**GET /api/books/:id**

#### Update a book

**PUT /api/books/:id**

```json
{
  "status": "Completed"
}
```

#### Delete a book

**DELETE /api/books/:id**

### Role-Based Access Control (RBAC)

- Users can manage only their own books.
- Admins can delete books added by any user.

## Project Structure

```
book-tracker/
│── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── bookRoutes.js
│   ├── config/
│   │   ├── db.js
│── .env
│── package.json
│── README.md
```

## Authors & Contributions

This project was developed as part of a final assignment. Each team member contributed to different aspects, including backend logic, authentication, and database management.

## License

This project is open-source and available under the [MIT License](LICENSE).
