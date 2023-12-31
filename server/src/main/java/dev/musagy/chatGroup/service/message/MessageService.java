package dev.musagy.chatGroup.service.message;

import dev.musagy.chatGroup.config.PreSendMessage;
import dev.musagy.chatGroup.model.message.MessageWithUserInfo;
import dev.musagy.chatGroup.model.message.MessageWithUserInfoAndMsgType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface MessageService {
    @Transactional
    MessageWithUserInfoAndMsgType createMessage(PreSendMessage<?> payload, Long chatId);
    @Transactional
    Page<MessageWithUserInfo> findMessagesPage(Long chatId, Date since, Pageable pageable);
}
