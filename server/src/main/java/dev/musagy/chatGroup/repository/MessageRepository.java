package dev.musagy.chatGroup.repository;

import dev.musagy.chatGroup.model.message.Message;
import dev.musagy.chatGroup.model.message.MessageWithUserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("""
    SELECT new dev.musagy.chatGroup.model.message.MessageWithUserInfo(
        m.id,
        m.content,
        m.sentAt,
        m.sender.username,
        m.sender.userAlias,
        cu.role
    ) FROM Message m
    JOIN ChatUser cu
    ON cu.chat.id = m.chat.id AND cu.user.id = m.sender.id
    WHERE m.chat.id = :chatId AND m.sentAt < :since
    ORDER BY m.sentAt DESC
    """)
    Page<MessageWithUserInfo> getMessagePage(Long chatId, Date since, Pageable pageable);
}
