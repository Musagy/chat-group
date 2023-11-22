package dev.musagy.chatGroup.service.message;

import dev.musagy.chatGroup.config.PreSendMessage;
import dev.musagy.chatGroup.model.chat.ChatUser;
import dev.musagy.chatGroup.model.chat.ChatUserPK;
import dev.musagy.chatGroup.model.message.Message;
import dev.musagy.chatGroup.model.message.MessageWithUserInfo;
import dev.musagy.chatGroup.model.message.SendMessageRequest;
import dev.musagy.chatGroup.repository.ChatUserRepository;
import dev.musagy.chatGroup.repository.MessageRepository;
import dev.musagy.chatGroup.security.UserPrincipal;
import dev.musagy.chatGroup.utils.ObjectToRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    MessageRepository msgRepo;
    @Autowired
    ChatUserRepository cuRepo;

    @Override
    @Transactional
    public MessageWithUserInfo createMessage(PreSendMessage<?> payload, Long chatId) {
        Authentication auth = payload.auth();
        Long requesterId = ((UserPrincipal) auth.getPrincipal()).getId();

        ChatUser member = cuRepo.getReferenceById(new ChatUserPK(requesterId, chatId));

        SendMessageRequest req = ObjectToRecord.bitesToObject(payload, SendMessageRequest.class);
        Message message =  new Message(
                null,
                req.content(),
                new Date(),
                member.getUser(),
                member.getChat()
        );
        message = msgRepo.save(message);

        return ObjectToRecord.addUserInfoInMessage(message, member);
    }

    @Override
    @Transactional
    public Page<MessageWithUserInfo> findMessagesPage(Long chatId, Date since, Pageable pageable) {
        return msgRepo.getMessagePage(chatId, since, pageable);
    }
}
