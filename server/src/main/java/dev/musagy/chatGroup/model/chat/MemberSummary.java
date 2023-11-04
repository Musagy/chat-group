package dev.musagy.chatGroup.model.chat;

import jakarta.validation.constraints.NotNull;

public record MemberSummary(
        @NotNull
        Long id,
        @NotNull
        String username,
        String userAlias,
        @NotNull
        ChatRole role
) {
}
