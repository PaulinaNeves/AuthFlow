# AuthFlow API

A RESTful API built with Node.js, Express and PostgreSQL for user management and authentication using JSON Web Tokens (JWT).

## Features

- User registration.
- User authentication with JWT.
- Password hashing with bcryptjs.
- CRUD operations for user management.
- Protected routes using authentication middleware.
- Authorization to restrict users to their own accounts.
- PostgreSQL database integration.
- Automated tests with Vitest and Supertest.

## Tech Stack

- **Runtime:** Node.js
- **Backend:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Token (JWT)
- **Password Hashing:** bcryptjs
- **Testing:** Vitest and Supertest

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/PaulinaNeves/AuthFlow.git
```

Navigate to the backend directory:

```bash
cd AuthFlow/Server-side
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a PostgreSQL database named `authflow`:

```sql
CREATE DATABASE authflow;
```

Connect to the database and execute the SQL schema:

```bash
psql -U your_db_user -d authflow -f database/schema.sql
```

The schema creates the `users` table with the fields required by the application.

### 4. Configure environment variables

Create a `.env` file in the `Server-side` directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=authflow
JWT_SECRET=your_jwt_secret
```

Replace the example values with your local PostgreSQL credentials and a secure JWT secret.

Never commit your `.env` file to GitHub.

### 5. Run the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The API runs locally at:

```text
http://localhost:3000
```

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/users` | Register a user | No |
| POST | `/login/users` | Authenticate a user | No |
| GET | `/users` | Get all users | Required |
| GET | `/users/:id` | Get a user by ID | Required |
| PUT | `/users/:id` | Update a user | Required |
| DELETE | `/users/:id` | Delete a user | Required |

### Authentication

Protected endpoints require a valid JWT in the request header:

```http
Authorization: Bearer <your_token>
```

### Register User

`POST /api/users`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login

`POST /api/login/users`

Request body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

The endpoint returns a JWT that can be used to access protected routes.

### Get All Users

`GET /api/users`

Requires authentication.

### Get User by ID

`GET /api/users/:id`

Example:

```http
GET /api/users/1
```

Requires authentication and authorization.

### Update User

`PUT /api/users/:id`

Request body:

```json
{
  "name": "John Updated",
  "email": "john@example.com",
  "password": "newpassword123"
}
```

Users can only update their own accounts.

### Delete User

`DELETE /api/users/:id`

Requires authentication and authorization. Users can only delete their own accounts.

## HTTP Status Codes

| Status | Description |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Invalid request |
| 401 | Authentication required or invalid credentials |
| 403 | Access forbidden |
| 404 | Resource not found |
| 409 | Email already registered |
| 500 | Internal server error |

## Running Tests

The project uses Vitest and Supertest for automated API testing.

Run the test suite:

```bash
npm test
```

## Security

- Passwords are hashed before being stored in the database.
- JWT is used to authenticate requests.
- Protected routes require a valid token.
- Authorization checks restrict access to user-owned resources.
- PostgreSQL queries use parameterized values.
- Environment variables are used for sensitive configuration.

## Author

**Paulina Neves**

GitHub: [@PaulinaNeves](https://github.com/PaulinaNeves)
