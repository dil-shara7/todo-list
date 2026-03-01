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
- *Frontend:* HTML5, CSS3, Vanilla JavaScript
- *Backend:* Node.js, Express.js
- *Containerisation:* Docker, Docker Compose
- *CI/CD:* GitHub Actions
- *Hosting:* Vercel
  
## Features
- Add, edit, and delete tasks
- Set task priority (High / Medium / Low)
- Due dates and reminder settings
- Progress tracking (0–100%)
- Filter tasks by status, priority, and due date
- In-memory REST API backend

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
- Docker Desktop (https://www.docker.com/products/docker-desktop/)

### Step 1 — Clone the Repository

bash
git clone https://github.com/dil-shara7/todo-list.git
cd todo-list

### Step 2 — Configure Environment 

bash
.env (optional — copy and edit as needed)
NODE_ENV=production
APP_PORT=3001

### Step 3 — Build and Start the Container

bash
docker compose up --build

### Step 4 — Verify the App is Running

Open your browser and go to:
- App: [http://localhost:3001](http://localhost:3001)
- Health Check: [http://localhost:3001/status](http://localhost:3001/status)

The health check endpoint will return:
json
{
  "status": "OK",
  "message": "Todo API is running"
}

### Step 5 — Stop the Container

bash
docker compose down


## Running Without Docker (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v8 or higher

### Installation

bash
# Clone the repository
git clone https://github.com/dil-shara7/todo-list.git
cd todo-list

# Install dependencies
npm install

# Run development server (with auto-restart via nodemon)
npm run dev

# OR run production server
npm start


The app will be available at [http://localhost:3001](http://localhost:3001)


## Docker Architecture

This project uses a *multi-stage Docker build* to optimise the final image:

| Stage | Base Image | Purpose |
|-------|-----------|---------|
| builder | node:18-alpine | Install production dependencies |
| production | node:18-alpine | Run the application |


### Security Decisions
- *Non-root user:* The container runs as appuser, not root
- *Alpine Linux:* Minimal base image with a smaller attack surface
- *No secrets in image:* Environment variables are injected at runtime
- *Health checks:* Docker monitors the /status endpoint every 30 seconds

  
## Useful Docker Commands

bash
# Build image only (without starting)
docker build -t taskflow-todo .

# Start in detached (background) mode
docker compose up -d --build

# View live logs
docker compose logs -f

# Check container health status
docker ps

# Open a shell inside the running container (for debugging)
docker exec -it taskflow-todo-app sh

# Remove containers and volumes
docker compose down -v


## API Endpoints

Base URL: http://localhost:3001/api

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /status | Health check |
| GET | /api/todos | Get all todos |
| GET | /api/todos/:id | Get single todo |
| POST | /api/todos | Create new todo |
| PUT | /api/todos/:id | Update todo |
| PATCH | /api/todos/:id/toggle | Toggle completion |
| DELETE | /api/todos/:id | Delete todo |
| DELETE | /api/todos | Delete all todos |


## Troubleshooting

*Port already in use:*
bash
# Change the port in .env
APP_PORT=3002
docker compose up --build


*Container not starting:*
bash
# Check logs for errors
docker compose logs todo-app


*Permission issues:*
bash
# Rebuild from scratch
docker compose down -v
docker compose up --build


## Learning Outcomes
- Practiced Git branching strategies
- Implemented CI/CD using GitHub Actions
- Gained experience in collaborative development
  
## Challenges Faced
- Connecting frontend with backend  
- Fixing CORS errors  
- Making UI responsive  



