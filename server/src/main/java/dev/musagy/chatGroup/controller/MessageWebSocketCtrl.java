package dev.musagy.chatGroup.controller;

import dev.musagy.chatGroup.config.PreSendMessage;
import dev.musagy.chatGroup.model.message.MessageWithUserInfo;
import dev.musagy.chatGroup.service.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class MessageWebSocketCtrl {
    @Autowired
    MessageService messageService;

    @MessageMapping("/msgTo/{chatId}")
    @SendTo("/topic/{chatId}")
    public MessageWithUserInfo sendMessage(
            @Payload PreSendMessage<?> payload,
            @DestinationVariable Long chatId
    ) {
        return messageService.createMessage(payload, chatId);
    }
}
