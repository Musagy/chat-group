package dev.musagy.chatGroup.utils;

import dev.musagy.chatGroup.model.chat.Chat;
import dev.musagy.chatGroup.model.chat.ChatRole;
import dev.musagy.chatGroup.model.chat.ChatWithRequesterRole;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.model.user.UserSummary;

public class ObjectToRecord {
    static public UserSummary userToUserSummary (User user) {
        return new UserSummary(
                user.getId(),
                user.getUsername(),
                user.getUserAlias(),
                user.getRole()
        );
    }
    static public ChatWithRequesterRole addRequesterRoleInChat(
            Chat chat,
            ChatRole requesterRole
    ) {
        return new ChatWithRequesterRole(
                chat.getId(),
                chat.getTitle(),
                chat.getDescription(),
                chat.getOwnerId(),
                requesterRole
        );
    }

}
