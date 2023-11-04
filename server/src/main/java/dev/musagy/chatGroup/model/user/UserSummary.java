package dev.musagy.chatGroup.model.user;

public record UserSummary(
        Long id,
        String username,
        String userAlias,
        Role role
) {
}
