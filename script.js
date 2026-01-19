// State Management
let currentUser = null;
let tasks = [];
let filters = {
    status: 'all',
    priority: 'all',
    dueDate: 'all'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
    checkReminders();
    setInterval(checkReminders, 60000); // Check every minute
});

// Event Listeners
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('taskForm').addEventListener('submit', handleAddTask);
    document.getElementById('editForm').addEventListener('submit', handleEditTask);
    document.getElementById('taskReminder').addEventListener('change', toggleCustomReminder);
}

// Authentication
function checkAuth() {
    const user = localStorage.getItem('taskflow_user');
    if (user) {
        currentUser = JSON.parse(user);
        showApp();
    } else {
        showLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple authentication (in production, this would be server-side)
    if (email && password) {
        const user = {
            email: email,
            name: email.split('@')[0],
            id: btoa(email)
        };
        
        localStorage.setItem('taskflow_user', JSON.stringify(user));
        currentUser = user;
        showNotification('Welcome back!', 'Login successful', 'success');
        showApp();
    }
}

function logout() {
    localStorage.removeItem('taskflow_user');
    currentUser = null;
    tasks = [];
    showLogin();
}

function showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('appContainer').classList.add('hidden');
}

function showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');
    
    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
    
    loadTasks();
}

// Task Management
function loadTasks() {
    const savedTasks = localStorage.getItem(`tasks_${currentUser.id}`);
    tasks = savedTasks ? JSON.parse(savedTasks) : [];
    renderTasks();
}

function saveTasks() {
    localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(tasks));
    renderTasks();
}

function handleAddTask(e) {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const notes = document.getElementById('taskNotes').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const link = document.getElementById('taskLink').value;
    const reminder = document.getElementById('taskReminder').value;
    const progress = parseInt(document.getElementById('taskProgress').value);
    const files = Array.from(document.getElementById('taskFile').files);

    const task = {
        id: Date.now(),
        title,
        notes,
        priority,
        dueDate,
        link,
        reminder,
        progress,
        completed: false,
        createdAt: new Date().toISOString(),
        files: files.map(f => f.name),
        userId: currentUser.id
    };

    // Handle custom reminder
    if (reminder === 'custom') {
        task.customReminder = document.getElementById('customReminder').value;
    }

    tasks.push(task);
    saveTasks();
    
    // Reset form
    document.getElementById('taskForm').reset();
    document.getElementById('progressValue').textContent = '0%';
    document.getElementById('customReminderGroup').classList.add('hidden');
    
    showNotification('Task Added', 'Your task has been created successfully', 'success');
}

function handleEditTask(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editTaskId').value);
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: document.getElementById('editTaskTitle').value,
            notes: document.getElementById('editTaskNotes').value,
            priority: document.getElementById('editTaskPriority').value,
            dueDate: document.getElementById('editTaskDueDate').value,
            link: document.getElementById('editTaskLink').value,
            progress: parseInt(document.getElementById('editTaskProgress').value)
        };
        
        saveTasks();
        closeEditModal();
        showNotification('Task Updated', 'Changes saved successfully', 'success');
    }
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) {
            task.progress = 100;
        }
        saveTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        showNotification('Task Deleted', 'Task removed successfully', 'info');
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskNotes').value = task.notes || '';
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskDueDate').value = task.dueDate || '';
        document.getElementById('editTaskLink').value = task.link || '';
        document.getElementById('editTaskProgress').value = task.progress || 0;
        document.getElementById('editProgressValue').textContent = (task.progress || 0) + '%';
        
        document.getElementById('editModal').classList.add('active');
    }
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

// Filters
function setFilter(type, value) {
    filters[type] = value;
    
    // Update active filter buttons
    if (type === 'status') {
        document.querySelectorAll('.filter-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.filter === value);
        });
    }
    
    renderTasks();
}

function getFilteredTasks() {
    return tasks.filter(task => {
        // Status filter
        if (filters.status === 'active' && task.completed) return false;
        if (filters.status === 'completed' && !task.completed) return false;
        
        // Priority filter
        if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
        
        // Due date filter
        if (filters.dueDate !== 'all' && task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (filters.dueDate === 'today') {
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                if (dueDate < today || dueDate >= tomorrow) return false;
            } else if (filters.dueDate === 'week') {
                const nextWeek = new Date(today);
                nextWeek.setDate(nextWeek.getDate() + 7);
                if (dueDate < today || dueDate >= nextWeek) return false;
            } else if (filters.dueDate === 'overdue') {
                if (dueDate >= today) return false;
            }
        }
        
        return true;
    });
}

// Rendering
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    const taskList = document.getElementById('taskList');
    
    // Update stats
    const totalTasks = tasks.length;
    const activeTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    document.getElementById('statTotal').textContent = totalTasks;
    document.getElementById('statActive').textContent = activeTasks;
    document.getElementById('statCompleted').textContent = completedTasks;
    document.getElementById('statProgress').textContent = progressPercent + '%';
    
    // Update filter counts
    document.getElementById('filterAll').textContent = tasks.length;
    document.getElementById('filterActive').textContent = activeTasks;
    document.getElementById('filterCompleted').textContent = completedTasks;
    
    // Render tasks
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-title">No tasks found</div>
                <div class="empty-text">Try adjusting your filters</div>
            </div>
        `;
    } else {
        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-item priority-${task.priority} ${task.completed ? 'completed' : ''}">
                <div class="task-header">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                         onclick="toggleTask(${task.id})">
                    </div>
                    <div class="task-content">
                        <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                        ${task.notes ? `<div class="task-notes">${task.notes}</div>` : ''}
                        
                        <div class="task-meta">
                            <div class="task-meta-item">
                                <span class="task-badge badge-${task.priority}">${task.priority}</span>
                            </div>
                            ${task.dueDate ? `
                                <div class="task-meta-item">
                                    📅 ${formatDate(task.dueDate)}
                                </div>
                            ` : ''}
                            <div class="task-meta-item">
                                🕐 ${formatDate(task.createdAt)}
                            </div>
                        </div>

                        ${task.link ? `
                            <div class="task-attachments">
                                <a href="${task.link}" target="_blank" class="attachment-item">
                                     Link
                                </a>
                            </div>
                        ` : ''}

                        ${task.files && task.files.length > 0 ? `
                            <div class="task-attachments">
                                ${task.files.map(file => `
                                    <div class="attachment-item">
                                        📎 ${file}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${task.progress !== undefined ? `
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${task.progress}%"></div>
                            </div>
                            <div class="progress-text">${task.progress}% complete</div>
                        ` : ''}

                        <div class="task-actions">
                            <button class="btn btn-sm btn-sage" onclick="editTask(${task.id})">
                                 Edit
                            </button>
                            <button class="btn btn-sm btn-burgundy" onclick="deleteTask(${task.id})">
                                 Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Reminders
function checkReminders() {
    if (!currentUser) return;
    
    const now = new Date();
    
    tasks.forEach(task => {
        if (task.completed || !task.dueDate) return;
        
        const dueDate = new Date(task.dueDate);
        let reminderTime;
        
        if (task.reminder === 'custom' && task.customReminder) {
            reminderTime = new Date(task.customReminder);
        } else if (task.reminder && task.reminder !== 'none') {
            const minutes = parseInt(task.reminder);
            reminderTime = new Date(dueDate.getTime() - minutes * 60000);
        }
        
        if (reminderTime && now >= reminderTime && now < dueDate) {
            // Check if we already showed this reminder
            const reminderKey = `reminder_${task.id}_${reminderTime.getTime()}`;
            if (!localStorage.getItem(reminderKey)) {
                showNotification(
                    'Task Reminder',
                    `"${task.title}" is due ${formatRelativeTime(dueDate)}`,
                    'warning'
                );
                localStorage.setItem(reminderKey, 'shown');
            }
        }
        
        // Check if overdue
        if (now > dueDate) {
            const overdueKey = `overdue_${task.id}_${dueDate.toDateString()}`;
            if (!localStorage.getItem(overdueKey)) {
                showNotification(
                    'Overdue Task',
                    `"${task.title}" is overdue`,
                    'error'
                );
                localStorage.setItem(overdueKey, 'shown');
            }
        }
    });
}

function toggleCustomReminder() {
    const reminderSelect = document.getElementById('taskReminder');
    const customGroup = document.getElementById('customReminderGroup');
    
    if (reminderSelect.value === 'custom') {
        customGroup.classList.remove('hidden');
    } else {
        customGroup.classList.add('hidden');
    }
}

// Notifications
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">${icons[type]}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body: message });
    }
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = date - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `in ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `in ${minutes}m`;
    } else {
        return 'soon';
    }
}

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}
