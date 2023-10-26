package dev.musagy.chatGroup.service.chat;

import dev.musagy.chatGroup.model.chat.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface ChatService {
    @Transactional
    Page<Chat> findChatsPageByUserId(long userId, Pageable pageable);

    Chat createChat(CreateChatRequest req, Long requesterId);
    void deleteChat(Long chatId, Long ownerId);

    Chat findById(Long chatId, Long userId);
    @Transactional
    Page<UserSummary> findUserSummariesPageByChatId(Long chatId, Pageable pageable);

    // ChatUser Service
    ChatUser addMemberByCUPK(ChatUserPK chatUserPK, Long requesterId);
    void deleteMemberByCUPK(ChatUserPK chatUserPK, Long requesterId);

    void addOwner(ChatUser chatUser);
    void changeRole(ChatUserPK chatUserPK, Long requesterId, ChatRole role);
}