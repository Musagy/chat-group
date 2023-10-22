package dev.musagy.chatGroup.repository;

import dev.musagy.chatGroup.model.chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
