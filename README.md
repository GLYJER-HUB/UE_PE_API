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
  - cover (VARCHAR, L'image du projet)
  - discipline (VARCHAR, Academic discipline)
  - type (VARCHAR, Project type)
  - author (Author of the project)
  - project_url (VARCHAR, Lien du projet ex: un lien github)
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
