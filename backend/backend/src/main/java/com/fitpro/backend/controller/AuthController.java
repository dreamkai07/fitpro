package com.fitpro.backend.controller;

import com.fitpro.backend.dto.AuthResponse;
import com.fitpro.backend.dto.LoginRequest;
import com.fitpro.backend.dto.RegisterRequest;
import com.fitpro.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {
        try {
            AuthResponse response =
                    authService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(400)
                    .body("{\"message\": \""
                            + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {
        try {
            AuthResponse response =
                    authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(401)
                    .body("{\"message\": \""
                            + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getProfile(java.security.Principal principal) {
        try {
            com.fitpro.backend.model.User user = authService.getUserByUsername(principal.getName());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity
                    .status(404)
                    .body("{\"message\": \"" + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(java.security.Principal principal, @RequestBody com.fitpro.backend.dto.UpdateProfileRequest request) {
        try {
            com.fitpro.backend.model.User user = authService.updateUser(principal.getName(), request);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity
                    .status(400)
                    .body("{\"message\": \"" + e.getMessage() + "\"}");
        }
    }
}