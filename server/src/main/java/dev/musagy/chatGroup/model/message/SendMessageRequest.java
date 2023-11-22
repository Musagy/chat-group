package dev.musagy.chatGroup.model.message;

import jakarta.validation.constraints.NotBlank;

public record SendMessageRequest(
        @NotBlank
        String content
) {
}
