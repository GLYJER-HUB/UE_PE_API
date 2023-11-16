# UE_PE_API

## Overview

The Backend API is designed to support the online platform making it easy to organize and view Université Espoir de Calvary Chapel students' final year projects.

## 1. Database Specifications

### 1.1 Database Type

The project uses MongoDB due to its stability and compatibility with project requirements.

### 1.2 Data Model

#### 1.2.1 Tables

- **Users:**
  - user_id (GUID, Primary Key)
  - username (VARCHAR, User's username)
  - password (VARCHAR, Hashed password using secure hashing techniques)
  - created_at (Date)
  - updated_at (Date)

- **Projects:**
  - project_id (GUID, Primary Key)
  - project_name (VARCHAR, Project name)
  - description (TEXT, Detailed project description)
  - discipline (VARCHAR, Academic discipline)
  - type (VARCHAR, Project type)
  - author (Author of the project)
  - deleted (BOOLEAN, Indicates if the project has been deleted)
  - added_by (GUID, Foreign Key referencing Users.user_id, indicates the user who added the project)
  - last_modified_by (GUID, Foreign Key referencing Users.user_id, indicates the user who last modified the project)
  - created_at (Date)
  - updated_at (Date)

## 2. Backend Specifications

### 2.1 Technical Environment

The backend is developed using Node.js with Express as the framework. Additional modules include Knex for database access, JWT for authentication, Bcryptjs for password hashing, and Joi for data validation.

### 2.2 API Endpoints

#### 2.2.1 `/api/projects`

- `GET`: Retrieve the list of projects based on filters (discipline, type, author, etc.).
- `POST`: Add a new project to the database.

#### 2.2.2 `/api/projects/:projectId`

- `GET`: Retrieve details of a specific project.
- `PUT`: Update details of an existing project.
- `DELETE`: Mark a project as deleted.

#### 2.2.3 `/api/users`

- `POST`: Create a new user.
- `PUT`: Update user information.
- `DELETE`: Delete a user (for administrators only).

#### 2.2.4 `/api/auth`

- `POST`: Authenticate a user and generate a JWT token.

## 3. Getting Started

### 3.1 Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### 3.2 Installation

- Clone the repository.
- Navigate to the project directory.
- Run `npm install` to install dependencies.

### 3.3 Configuration

- Configure the database connection in the backend.
- Set up environment variables for sensitive information.
