# UE_PE_API

## Overview

The Backend API is designed to support the online platform making it easy to organize and view Université Espoir de Calvary Chapel students' final year projects.

## 1. Database Specifications

### 1.1 Database Type

The project uses MongoDB due to its stability and compatibility with project requirements.

### 1.2 Data Model

#### 1.2.1 Tables

- **Users:**
  - `user_id` (GUID, Primary Key)
  - `username` (VARCHAR, User's username)
  - `password` (VARCHAR, Hashed password using secure hashing techniques)
  - `role` (VARCHAR)
  - `created_at` (Date)
  - `updated_at` (Date)
    
- **UserLog:**
  - `user_id` (GUID, Primary Key): Unique identifier for the user.
  - `last_login` (Date): Timestamp indicating the user's last login.
  - `last_logout` (Date): Timestamp indicating the user's last logout.

- **Projects:**
  - `project_id` (GUID, Primary Key): Unique identifier for the project.
  - `project_name` (VARCHAR): Name of the project.
  - `description` (TEXT): Detailed description of the project.
  - `cover` (VARCHAR): Image file path for the project.
  - `pdf` (VARCHAR): PDF file path for the project.
  - `discipline` (VARCHAR): Academic discipline associated with the project.
  - `type` (VARCHAR): Type of the project.
  - `authors` (VARCHAR): Authors of the project.
  - `project_url` (VARCHAR): URL link to the project (e.g., a GitHub link).
  - `deleted` (BOOLEAN): Indicates whether the project has been deleted (true or false).
  - `added_by` (GUID, Foreign Key referencing Users.user_id): Identifies the user who added the project.
  - `last_modified_by` (GUID, Foreign Key referencing Users.user_id): Identifies the user who last modified the project.
  - `created_at` (Date): Timestamp indicating when the project was created.
  - `updated_at` (Date): Timestamp indicating when the project was last updated.

## 2. Backend Specifications

### 2.1 Technical Environment

The backend is developed using Node.js with Express as the framework. Additional modules include JWT for authentication, Bcryptjs for password hashing, and Joi for data validation.

### 2.2 API Endpoints

#### 2.2.1 `/api/auth`

- `POST` /login: Endpoint to authenticate a user and generate a token.
- `POST` /logout: Endpoint to log out a user.

#### 2.2.2 `/api/users`

- `POST` /: Endpoint to add a new user.
- `GET` /: Endpoint to get a list of users.
- `GET` /:id:: Endpoint to get a user by _id.
- `PUT` /:id:: Endpoint to update a user.
- `PUT` /delete/:id:: Endpoint to delete a user.
  
#### 2.2.3 `/api/logs`

- `POST` /: Endpoint to add a log.
- `PUT` /:id:: Endpoint to update a log.

#### 2.2.4 `/api/projects`

- `POST` /: Endpoint to add a new project.
- `GET` /: Endpoint to get all projects (cached for 1 minute).
- `GET` /discipline/:discipline:: Endpoint to get projects by discipline (cached for 1 minute).
- `GET` /type/:type:: Endpoint to get projects by type (cached for 1 minute).
- `GET` /discipline/:discipline/type/:type:: Endpoint to get projects by discipline and type.
- `GET` /id/:id:: Endpoint to get a project by _id.
- `PUT` /:id:: Endpoint to update a project.
- `PUT` /delete/:id:: Endpoint to delete a project.

## 3. Getting Started

### 3.1 Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### 3.2 Installation

- Clone the repository:
   ```bash
   git clone https://github.com/jcblanc2/PenX.git
   ```

- Navigate to the project directory:
   ```bash
   cd UE_PE_API
   ```

- Install server dependencies:
   ```bash
   npm install
   ```

### 3.3 Configuration

   - Create a `.env` file in the `UE_PE_API` directory and set the following variables:

     ```env
     PORT=3000
     MONGODB_URI=...
     JWT_SECRET=your-secret-key
     ```

### 3.4 Usage

- Start the server:
   ```bash
   npm run dev
   ```
