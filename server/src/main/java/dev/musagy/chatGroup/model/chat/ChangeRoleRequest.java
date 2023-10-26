package dev.musagy.chatGroup.model.chat;

import jakarta.validation.constraints.NotNull;

public record ChangeRoleRequest(
        @NotNull
        ChatUserPK chatUserPK,
        @NotNull
        ChatRole role
) {
}
