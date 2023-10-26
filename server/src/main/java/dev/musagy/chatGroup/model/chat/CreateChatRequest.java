package dev.musagy.chatGroup.model.chat;

import jakarta.validation.constraints.NotBlank;

public record CreateChatRequest(
        @NotBlank
        String title,
        @NotBlank
        String description
) {
}
