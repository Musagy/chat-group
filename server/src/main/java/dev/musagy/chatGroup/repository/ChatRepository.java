package dev.musagy.chatGroup.repository;

import dev.musagy.chatGroup.model.chat.Chat;
import dev.musagy.chatGroup.model.chat.MemberSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("""
    SELECT new dev.musagy.chatGroup.model.chat.MemberSummary(
        cu.user.id,
        cu.user.username,
        cu.user.userAlias,
        cu.role
    ) FROM ChatUser cu
    WHERE cu.chat.id = :chatId
    """)
    Page<MemberSummary> findUserSummariesPageByChatId(@Param("chatId") Long chatId, Pageable pageable);

    @Query("""
    SELECT cu.chat
    FROM ChatUser cu
    WHERE cu.user.id = :userId
    AND cu.chat.isActive = TRUE
    ORDER BY cu.chat.id DESC
    """)
    Page<Chat> findChatsPageByUserId(@Param("userId") Long userId, Pageable pageable);

    @Modifying
    @Query("""
    UPDATE Chat c
    SET c.isActive = FALSE
    WHERE c.id = :chatId
    """)
    void deactivateChatById(@Param("chatId") Long chatId);
}
