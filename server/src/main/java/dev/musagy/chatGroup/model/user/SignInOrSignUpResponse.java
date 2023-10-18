package dev.musagy.chatGroup.model.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SignInOrSignUpResponse(
    @NotNull
    User user,
    @NotBlank
    String jwt
) {
}
