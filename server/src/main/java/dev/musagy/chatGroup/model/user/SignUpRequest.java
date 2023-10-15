package dev.musagy.chatGroup.model.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignUpRequest(
        @Email
        String email,
        @NotBlank
        String username,
        @NotBlank
        String password,
        String userAlias
) {
}
