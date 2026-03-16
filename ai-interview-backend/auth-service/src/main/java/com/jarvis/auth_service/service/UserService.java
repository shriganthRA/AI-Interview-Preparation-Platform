package com.jarvis.auth_service.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jarvis.auth_service.config.JwtService;
import com.jarvis.auth_service.dto.AuthResponseDTO;
import com.jarvis.auth_service.dto.LoginRequestDTO;
import com.jarvis.auth_service.dto.RefreshTokenRequestDTO;
import com.jarvis.auth_service.dto.RegisterRequestDTO;
import com.jarvis.auth_service.entity.User;
import com.jarvis.auth_service.repository.UserRepo;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final TokenBlacklistService tokenBlacklistService;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RedisTokenService redisTokenService;


    // Register User
    public String register(RegisterRequestDTO request) {
        Optional<User> existingUser = userRepo.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(user);
        return "User registered successfully";
    }

    // Login User
    public AuthResponseDTO login(LoginRequestDTO request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String access_token = jwtService.generateToken(user.getEmail());
        String refresh_token = jwtService.refreshToken(user.getEmail());

        return new AuthResponseDTO(access_token, refresh_token, user.getEmail());
    }

    // Refresh Token
    public AuthResponseDTO refreshToken(RefreshTokenRequestDTO refreshTokenRequestDTO) {
        String storedToken = redisTokenService.getRefreshToken(refreshTokenRequestDTO.getEmail());

        if (storedToken == null || !storedToken.equals(refreshTokenRequestDTO.getRefreshToken())) {
            throw new RuntimeException("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateToken(refreshTokenRequestDTO.getEmail());

        return new AuthResponseDTO(newAccessToken, refreshTokenRequestDTO.getRefreshToken(),
                refreshTokenRequestDTO.getEmail());
    }

    // Logout User
    public String logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            long expiration = jwtService.extractExpiration(authHeader).getTime() - System.currentTimeMillis();

            tokenBlacklistService.blacklistToken(token, expiration);
        }

        return "Logged out successfully";
    }
}
