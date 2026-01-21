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

    