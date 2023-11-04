package dev.musagy.chatGroup.utils;

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
}
