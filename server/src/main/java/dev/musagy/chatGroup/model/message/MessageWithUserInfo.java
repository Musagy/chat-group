package dev.musagy.chatGroup.model.message;

import dev.musagy.chatGroup.model.chat.ChatRole;

import java.util.Date;

public record MessageWithUserInfo(
        Long id,
        String content,
        Date sentAt,
        String username,
        String userAlias,
        ChatRole role
) {
}
