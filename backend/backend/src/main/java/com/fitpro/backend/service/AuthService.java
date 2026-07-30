package com.fitpro.backend.service;

import com.fitpro.backend.dto.AuthResponse;
import com.fitpro.backend.dto.LoginRequest;
import com.fitpro.backend.dto.RegisterRequest;
import com.fitpro.backend.dto.UpdateProfileRequest;
import com.fitpro.backend.model.User;
import com.fitpro.backend.repository.UserRepository;
import com.fitpro.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterRequest request) {

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken!");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setAge(request.getAge());
        user.setWeight(request.getWeight());
        user.setHeight(request.getHeight());
        user.setFitnessGoal(request.getFitnessGoal());
        user.setActivityLevel(request.getActivityLevel());
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            user.setRole(request.getRole().toUpperCase());
        }

        // ENCRYPT the password before saving
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername());

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                "Registration successful!",
                user.getRole()
        );
    }

    public AuthResponse login(LoginRequest request) {

        // This checks username + password
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("User not found!")
                );

        if (request.getRole() != null && !request.getRole().equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Unauthorized role for this user!");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                "Login successful!",
                user.getRole()
        );
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    public User updateUser(String username, UpdateProfileRequest request) {
        User user = getUserByUsername(username);
        
        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getAge() != null) user.setAge(request.getAge());
        if (request.getWeight() != null) user.setWeight(request.getWeight());
        if (request.getHeight() != null) user.setHeight(request.getHeight());
        if (request.getFitnessGoal() != null) user.setFitnessGoal(request.getFitnessGoal());
        if (request.getActivityLevel() != null) user.setActivityLevel(request.getActivityLevel());
        if (request.getCalorieTarget() != null) user.setCalorieTarget(request.getCalorieTarget());
        if (request.getProteinTarget() != null) user.setProteinTarget(request.getProteinTarget());
        
        return userRepository.save(user);
    }
}