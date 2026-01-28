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

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json({
    success: true,
    count: todos.length,
    data: todos
  });
});

// Get single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// Create new todo
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    description: description?.trim() || '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  
  res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo
  });
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  const { title, description, completed } = req.body;
  
  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty'
      });
    }
    todos[todoIndex].title = title.trim();
  }
  
  if (description !== undefined) {
    todos[todoIndex].description = description.trim();
  }
  
  if (completed !== undefined) {
    todos[todoIndex].completed = Boolean(completed);
  }
  
  todos[todoIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'Todo updated successfully',
    data: todos[todoIndex]
  });
});