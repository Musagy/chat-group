package dev.musagy.chatGroup.model.user;

import jakarta.validation.constraints.NotBlank;

public record SignInOrSignUpResponse(
    @NotBlank
    String jwt
) {
}
