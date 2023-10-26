package dev.musagy.chatGroup.model.chat;

import jakarta.validation.constraints.NotNull;

public record AddMemberRequest(
        @NotNull
        Long userId,
        @NotNull
        Long chatId
) {
}
