package dev.musagy.chatGroup.service.message;

import dev.musagy.chatGroup.config.PreSendMessage;
import dev.musagy.chatGroup.model.chat.ChatRole;
import dev.musagy.chatGroup.model.chat.ChatUser;
import dev.musagy.chatGroup.model.chat.ChatUserPK;
import dev.musagy.chatGroup.model.message.*;
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

    public MessageWithUserInfoAndMsgType sendMessage(SendMessageRequest req, ChatUser member) {
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

    public MessageWithUserInfoAndMsgType disconnectAll(ChatUser member) {
        return new MessageWithUserInfoAndMsgType(
                member.getUser().getId(),
                "",
                new Date(),
                null,
                null,
                ChatRole.OWNER,
                MessageType.DISCONNECT_ALL
        );
    }

    @Override
    @Transactional
    public MessageWithUserInfoAndMsgType createMessage(PreSendMessage<?> payload, Long chatId) {
        SendMessageRequest req = ObjectToRecord.bitesToObject(payload, SendMessageRequest.class);

        Authentication auth = payload.auth();
        Long requesterId = ((UserPrincipal) auth.getPrincipal()).getId();
        ChatUser member = cuRepo.getReferenceById(new ChatUserPK(requesterId, chatId));

        return MessageType.DISCONNECT_ALL.equals(req.type()) && ChatRole.OWNER.equals(member.getRole())
                ? disconnectAll(member)
                : sendMessage(req, member);
    }

    @Override
    @Transactional
    public Page<MessageWithUserInfo> findMessagesPage(Long chatId, Date since, Pageable pageable) {
        return msgRepo.getMessagePage(chatId, since, pageable);
    }
}
