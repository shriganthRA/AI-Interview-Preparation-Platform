package com.jarvis.auth_service.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RefreshTokenResponseDTO {

    private String refreshToken;
    private String accessToken;
}
