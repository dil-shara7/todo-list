const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todos
let todos = [
  {
    id: 1,
    title: 'Sample Todo',
    description: 'This is a sample todo item',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

let nextId = 2;

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Todo API is running',
    endpoints: {
      getTodos: 'GET /api/todos',
      getTodo: 'GET /api/todos/:id',
      createTodo: 'POST /api/todos',
      updateTodo: 'PUT /api/todos/:id',
      deleteTodo: 'DELETE /api/todos/:id',
      toggleTodo: 'PATCH /api/todos/:id/toggle'
    }
  });
});
