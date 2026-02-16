# Todo-list System
![CI Pipeline](https://github.com/dil-shara7/todo-list/actions/workflows/ci.yml/badge.svg)
![Deploy Status](https://github.com/dil-shara7/todo-list/actions/workflows/deploy.yml/badge.svg)

## Group Information
- **Student 1:** R.G Malsha Prabodini – ITBNM-2313-0058 –  Frontend Developer  
- **Student 2:** A.R.D.T Wickramanayaka – ITBNM-2313-0084 –  Backend Developer  
- **Student 3:** A.A.M Dilshara Dias – ITBNM-2313-0015 –  DevOps & Testing  

## Project Description
TaskFlow is a task management web application that helps users create, organize, and track daily tasks. Users can add tasks, set priorities, update progress, and manage their work efficiently.

## Project Overview
TaskFlow is a web-based task management app that allows users to:
- Create tasks with priorities, due dates, notes, attachments, and links
- Track task progress
- Set reminders for upcoming or overdue tasks
- Filter tasks by status, priority, and due date
- Edit and delete tasks easily

## Live Deployment
**Live URL:**[ http://dil-shara7.github.io/todo-list/](https://todo-list-rho-seven-68.vercel.app/)

## Technologies Used
- HTML5, CSS3, JavaScript  
- Spring Boot (Java)  
- GitHub Actions  
- Vercel
  
## Features
- Add, edit, and delete tasks  
- Set task priority and due dates  
- Track task progress  
- Filter tasks

## Branch Strategy

We implemented the following branching strategy:

- `main` - Production branch  
- `develop` - Integration branch  
- `feature/malsha` - Frontend Developer
- `feature/dulara` - Backend Developer
- `feature/dilshara` - Devops Manager

## Individual Contributions

### R.G Malsha Prabodini- ITBNM-2313-0058
- Repository setup  
- Frontend design (HTML, CSS, JS)  
- Task filtering and reminder logic  

### A.R.D.T Wickramanayaka- ITBNM-2313-0084
- Backend API development  
- User authentication  

### A.A.M Dilshara Dias- ITBNM-2313-0015
- CI/CD pipeline setup  
- Deployment  
- Testing

## Future Enhancements
- User authentication
- Cloud database integration
- Task reminders via email
- Mobile responsive improvements  

## Setup Instructions
### Prerequisites
- Web Browser 
- Git 

### Installation
# Clone the repository
git clone  https://github.com/dil-shara7/todo-list.git

# Navigate to project folder
cd todo-list

# Install dependencies
npm install

# Run development server
npm run dev

## Learning Outcomes
- Practiced Git branching strategies
- Implemented CI/CD using GitHub Actions
- Gained experience in collaborative development
  
## Challenges Faced
- Connecting frontend with backend  
- Fixing CORS errors  
- Making UI responsive  


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




