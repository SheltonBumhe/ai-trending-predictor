package com.trendpredictor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        User user = new User();
        user.setEmail(request.email);
        user.setPasswordHash(passwordEncoder.encode(request.password));
        userRepository.save(user);
        String token = JwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(token);
    }

    public ResponseEntity<?> login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        User user = userOpt.get();
        if (!passwordEncoder.matches(request.password, user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = JwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(token);
    }

    public ResponseEntity<?> logout() {
        // For JWT, logout is handled client-side (just delete the token)
        return ResponseEntity.ok("Logged out");
    }

    public ResponseEntity<?> googleLogin(OAuthRequest request) {
        // TODO: Validate Google token, find or create user, return JWT
        return ResponseEntity.ok("Google login (stub)");
    }

    public ResponseEntity<?> appleLogin(OAuthRequest request) {
        // TODO: Validate Apple token, find or create user, return JWT
        return ResponseEntity.ok("Apple login (stub)");
    }
} 