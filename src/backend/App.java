package com.taskflow.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
@RequestMapping("/api")
public class TaskFlowBackend {

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private PasswordEncoder encoder;

    public static void main(String[] args) {
        SpringApplication.run(TaskFlowBackend.class, args);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**").allowedOrigins("*").allowedMethods("*");
            }
        };
    }

    // User Registration
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> user) {
        try {
            String sql = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
            String hashedPwd = encoder.encode(user.get("password"));
            jdbc.update(sql, user.get("email"), hashedPwd, user.get("email").split("@")[0]);
            return Map.of("success", true, "message", "User registered");
        } catch (Exception e) {
            return Map.of("success", false, "message", e.getMessage());
        }
    }

    // User Login
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> creds) {
        try {
            String email = creds.get("email");
            String password = creds.get("password");
            
            if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
                return Map.of("success", false, "message", "Email and password are required");
            }
            
            String sql = "SELECT * FROM users WHERE email = ?";
            User user = jdbc.queryForObject(sql, new UserMapper(), email);
            
            if (encoder.matches(password, user.password)) {
                return Map.of("success", true, "user", Map.of(
                    "id", user.id, "email", user.email, "name", user.name
                ));
            }
            return Map.of("success", false, "message", "Invalid credentials");
        } catch (Exception e) {
            return Map.of("success", false, "message", "User not found");
        }
    }

    // Get All Tasks
    @GetMapping("/tasks/{userId}")
    public List<Task> getTasks(@PathVariable int userId) {
        String sql = "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC";
        return jdbc.query(sql, new TaskMapper(), userId);
    }

    // Create Task
    @PostMapping("/tasks")
    public Map<String, Object> createTask(@RequestBody Task task) {
        try {
            String sql = "INSERT INTO tasks (user_id, title, notes, priority, due_date, link, " +
                        "reminder, progress, completed, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            jdbc.update(sql, task.userId, task.title, task.notes, task.priority, 
                       task.dueDate, task.link, task.reminder, task.progress, 
                       task.completed, LocalDateTime.now());
            return Map.of("success", true, "message", "Task created");
        } catch (Exception e) {
            return Map.of("success", false, "message", e.getMessage());
        }
    }

    // Update Task
    @PutMapping("/tasks/{id}")
    public Map<String, Object> updateTask(@PathVariable int id, @RequestBody Task task) {
        try {
            String sql = "UPDATE tasks SET title = ?, notes = ?, priority = ?, due_date = ?, " +
                        "link = ?, reminder = ?, progress = ?, completed = ? WHERE id = ?";
            jdbc.update(sql, task.title, task.notes, task.priority, task.dueDate, 
                       task.link, task.reminder, task.progress, task.completed, id);
            return Map.of("success", true, "message", "Task updated");
        } catch (Exception e) {
            return Map.of("success", false, "message", e.getMessage());
        }
    }

    