package dev.musagy.chatGroup.model.user;

import jakarta.validation.constraints.NotBlank;

public record SignInRequest(
        @NotBlank
        String usernameOrEmail,
        @NotBlank
        String password
) {
}
