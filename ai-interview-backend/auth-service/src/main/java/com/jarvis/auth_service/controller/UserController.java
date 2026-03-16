package com.jarvis.auth_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarvis.auth_service.dto.AuthResponseDTO;
import com.jarvis.auth_service.dto.LoginRequestDTO;
import com.jarvis.auth_service.dto.RegisterRequestDTO;
import com.jarvis.auth_service.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    // Register API
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO request) {
        String response = userService.register(request);

        return ResponseEntity.ok(response);
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request) {
        AuthResponseDTO response = userService.login(request);

        return ResponseEntity.ok(response);
    }

    // Logout API
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String response = userService.logout(request);

        return ResponseEntity.ok(response);
    }
}
