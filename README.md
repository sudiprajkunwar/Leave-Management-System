# Leave Management System - Backend

The backend of the Leave Management System is responsible for handling the business logic, data storage, and API endpoints for managing employee leave requests within an organization.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)

## Features

- Authentication: Secure endpoints with JWT authentication.
- Employee Management: CRUD operations for managing employee profiles.

## Installation

1. Clone the repository: `git clone https://github.com/sudiprajkunwar/Leave-Management-System.git`
2. Install dependencies: `yarn install`
3. Set up environment variables: Create a `.env` file and configure database connection details, JWT secret key, etc.
4. Run the application: `yarn start`

## Usage

- Start the server: `yarn start`
- Use Postman or any API testing tool to send requests to the API endpoints.
- Refer to the API documentation for details on available endpoints and request formats.

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/auth/login`: User login endpoint to authenticate and generate JWT tokens.
- `POST /api/auth/refresh-token`: Refresh expired access tokens using refresh tokens.
- `POST /api/employees`: Create a new employee profile.
- `GET /api/employees`: Get a list of all employees.
- `GET /api/employees/:id`: Get details of a specific employee.
- `PUT /api/employees/:id`: Update an existing employee profile.
- `DELETE /api/employees/:id`: Delete an employee profile.

Note: Replace `:id` with the actual employee ID in the URL.

## Database Schema

The backend uses a PostgreSQL database with the following schema:

- employees: Stores employee details.
- roles: Defines user roles (admin, manager, employee).
- permissions: Defines permissions for different roles.

Note: Refer to the database schema for detailed table structures and relationships.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL (Database)
- JWT (JSON Web Tokens) for authentication
