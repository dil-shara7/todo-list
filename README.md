#  Todo-list Backend API

Backend service for the **Todo-list System**, built using **Spring Boot**, **JDBC**, and **MySQL**.  
It provides REST APIs for **user authentication** and **task management**.


##  Project Overview

Todo-list Backend handles:

- User registration & login (with encrypted passwords)
- Task creation, update, deletion
- Task progress tracking
- Task completion toggling
- Database interaction using JDBC



##  Technologies Used

- Java
- Spring Boot
- Spring Web (REST APIs)
- Spring JDBC
- Spring Security Crypto (BCrypt Password Encryption)
- MySQL (or other SQL database)
- Maven


##  Backend Features

###  User Features
- Register new users
- Secure login using encrypted passwords (BCrypt)

###  Task Features
- Create tasks
- View all tasks for a user
- Update tasks
- Delete tasks
- Toggle task completion
- Track task progress


##  Security

- Passwords are encrypted using **BCryptPasswordEncoder**
- Raw passwords are **never stored** in the database



##  CORS Configuration

Backend allows cross-origin requests:

```java
registry.addMapping("/api/**")
        .allowedOrigins("*")
        .allowedMethods("*");
```

This enables frontend applications to connect to the backend.



##  Database Structure

### Users Table

| Column   | Type      | Description         |
|----------|-----------|---------------------|
| id       | INT (PK)  | User ID             |
| email    | VARCHAR   | User email          |
| password | VARCHAR   | Encrypted password  |
| name     | VARCHAR   | User name           |



### Tasks Table

| Column      | Type      | Description            |
|-------------|-----------|------------------------|
| id          | INT (PK)  | Task ID                |
| user_id     | INT (FK)  | Owner of task          |
| title       | VARCHAR   | Task title             |
| notes       | TEXT      | Task notes             |
| priority    | VARCHAR   | Task priority          |
| due_date    | VARCHAR   | Due date               |
| link        | VARCHAR   | Related link           |
| reminder    | VARCHAR   | Reminder time          |
| progress    | INT       | Task progress (0–100)  |
| completed   | BOOLEAN   | Task completion status |
| created_at  | DATETIME  | Creation time          |



## API Endpoints

**Base URL**
```
http://localhost:8080/api
```



###  Register User

**POST** `/register`

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response**
```json
{
  "success": true,
  "message": "User registered"
}
```



###  Login User

**POST** `/login`

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "user"
  }
}
```



###  Get All Tasks

**GET** `/tasks/{userId}`

Example:
```
GET /tasks/1
```



###  Create Task

**POST** `/tasks`

```json
{
  "userId": 1,
  "title": "Complete Assignment",
  "notes": "Finish backend documentation",
  "priority": "High",
  "dueDate": "2026-01-30",
  "link": "",
  "reminder": "09:00",
  "progress": 0,
  "completed": false
}
```



###  Update Task

**PUT** `/tasks/{id}`



###  Delete Task

**DELETE** `/tasks/{id}`



###  Toggle Task Completion

**PATCH** `/tasks/{id}/toggle`

Automatically:
- Marks task as completed/not completed
- Sets progress to **0 or 100**



##  Running the Backend

1. Clone project  
2. Configure database in `application.properties`  
3. Run:

```bash
mvn spring-boot:run
```

Server starts at:

```
http://localhost:8080
```



##  Author

T0d0-list Backend developed for learning full-stack task management systems using Spring Boot.
