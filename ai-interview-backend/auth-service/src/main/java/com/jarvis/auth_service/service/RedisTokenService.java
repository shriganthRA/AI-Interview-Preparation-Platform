package com.jarvis.auth_service.service;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisTokenService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void saveRefreshToken(String email, String refreshToken) {
        redisTemplate.opsForValue()
                .set(email, refreshToken, Duration.ofHours(24));
    }

    public String getRefreshToken(String email) {
        return (String) redisTemplate.opsForValue().get(email);
    }

    public void deleteToken(String email) {
        redisTemplate.delete(email);
    }
}
