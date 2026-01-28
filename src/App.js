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