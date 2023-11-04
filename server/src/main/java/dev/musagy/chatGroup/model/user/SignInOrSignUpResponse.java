package dev.musagy.chatGroup.model.user;

public record SignInOrSignUpResponse(
    String token,
    UserSummary user
) {
}
