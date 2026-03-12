package com.jarvis.auth_service.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RefreshTokenRequestDTO {

    private String email;
    private String refreshToken;
}
