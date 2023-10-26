package dev.musagy.chatGroup.repository;

import dev.musagy.chatGroup.model.chat.ChatUser;
import dev.musagy.chatGroup.model.chat.ChatUserPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatUserRepository extends JpaRepository<ChatUser, ChatUserPK> {
}
