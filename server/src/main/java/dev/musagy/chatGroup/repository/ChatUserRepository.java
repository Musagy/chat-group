package dev.musagy.chatGroup.repository;

import dev.musagy.chatGroup.model.chat.ChatUser;
import dev.musagy.chatGroup.model.chat.ChatUserPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ChatUserRepository extends JpaRepository<ChatUser, ChatUserPK> {
    @Modifying
    @Query("""
        DELETE ChatUser cu
        WHERE cu.chat.id = :chatId
    """)
    void clearMembersByChatId(Long chatId);
}
