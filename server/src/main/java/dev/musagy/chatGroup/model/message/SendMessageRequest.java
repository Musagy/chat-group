package dev.musagy.chatGroup.model.message;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SendMessageRequest(
        @NotNull
        String content,
        @NotBlank
        MessageType type
) {
}
