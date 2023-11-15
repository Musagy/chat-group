package dev.musagy.chatGroup.model.chat;


public record ChatWithRequesterRole(
        Long id,
        String title,
        String description,
        Long ownerId,
        ChatRole requesterRole
) {
}
