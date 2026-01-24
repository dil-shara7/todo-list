const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); 

// Database Connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'taskflow_db'
});

// --- User Registration ---
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const name = email.split('@')[0];
        const hashedPwd = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
        await pool.execute(sql, [email, hashedPwd, name]);

        res.json({ success: true, message: "User registered" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- User Login ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            return res.json({
                success: true,
                user: { id: user.id, email: user.email, name: user.name }
            });
        }
        res.json({ success: false, message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ success: false, message: "User not found" });
    }
});

// --- Get All Tasks ---
app.get('/api/tasks/:userId', async (req, res) => {
    try {
        const [tasks] = await pool.execute(
            "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC", 
            [req.params.userId]
        );
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Create Task ---
app.post('/api/tasks', async (req, res) => {
    try {
        const t = req.body;
        const sql = `INSERT INTO tasks (user_id, title, notes, priority, due_date, link, reminder, progress, completed, created_at) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
        
        await pool.execute(sql, [t.userId, t.title, t.notes, t.priority, t.dueDate, t.link, t.reminder, t.progress, t.completed]);
        res.json({ success: true, message: "Task created" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- Update Task ---
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const t = req.body;
        const sql = `UPDATE tasks SET title = ?, notes = ?, priority = ?, due_date = ?, link = ?, reminder = ?, progress = ?, completed = ? WHERE id = ?`;
        
        await pool.execute(sql, [t.title, t.notes, t.priority, t.dueDate, t.link, t.reminder, t.progress, t.completed, req.params.id]);
        res.json({ success: true, message: "Task updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- Delete Task ---
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await pool.execute("DELETE FROM tasks WHERE id = ?", [req.params.id]);
        res.json({ success: true, message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- Toggle Task Completion ---
app.patch('/api/tasks/:id/toggle', async (req, res) => {
    try {
        const sql = `UPDATE tasks SET 
                     completed = NOT completed, 
                     progress = CASE WHEN NOT completed THEN 100 ELSE 0 END 
                     WHERE id = ?`;
        await pool.execute(sql, [req.params.id]);
        res.json({ success: true, message: "Task toggled" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));