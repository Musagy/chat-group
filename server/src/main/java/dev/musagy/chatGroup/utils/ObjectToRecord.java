package dev.musagy.chatGroup.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.musagy.chatGroup.config.PreSendMessage;
import dev.musagy.chatGroup.model.chat.Chat;
import dev.musagy.chatGroup.model.chat.ChatRole;
import dev.musagy.chatGroup.model.chat.ChatUser;
import dev.musagy.chatGroup.model.chat.ChatWithRequesterRole;
import dev.musagy.chatGroup.model.message.Message;
import dev.musagy.chatGroup.model.message.MessageWithUserInfo;
import dev.musagy.chatGroup.model.message.SendMessageRequest;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.model.user.UserSummary;
import jakarta.validation.ValidationException;

import java.nio.charset.StandardCharsets;

public class ObjectToRecord {
    static public UserSummary userToUserSummary (User user) {
        return new UserSummary(
                user.getId(),
                user.getUsername(),
                user.getUserAlias(),
                user.getRole()
        );
    }
    static public ChatWithRequesterRole addRequesterRoleInChat(
            Chat chat,
            ChatRole requesterRole
    ) {
        return new ChatWithRequesterRole(
                chat.getId(),
                chat.getTitle(),
                chat.getDescription(),
                chat.getOwnerId(),
                requesterRole
        );
    }
    public static <T> T bitesToObject(PreSendMessage<?> payload, Class<T> classReturn) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new String(
                    (byte[]) payload.req(),
                    StandardCharsets.UTF_8),
                    classReturn
            );
        }  catch (JsonProcessingException e) {
            throw new ValidationException("No se pudo transformar el array de Bites a " + classReturn.getName());
        }
    }
    public static MessageWithUserInfo addUserInfoInMessage(Message message, ChatUser member) {
        return new MessageWithUserInfo(
                message.getId(),
                message.getContent(),
                message.getSentAt(),
                member.getUser().getUsername(),
                member.getUser().getUserAlias(),
                member.getRole()
        );
    }
}
