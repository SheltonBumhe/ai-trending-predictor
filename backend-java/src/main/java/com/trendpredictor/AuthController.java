package com.trendpredictor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return authService.logout();
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody OAuthRequest request) {
        return authService.googleLogin(request);
    }

    @PostMapping("/apple")
    public ResponseEntity<?> appleLogin(@RequestBody OAuthRequest request) {
        return authService.appleLogin(request);
    }
} 