package dev.musagy.chatGroup.utils;

import dev.musagy.chatGroup.config.PreSendMessage;
import org.springframework.lang.NonNull;
import org.springframework.lang.NonNullApi;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.security.core.Authentication;

public class WebSocketUtils {
    static public Message<PreSendMessage<?>> CreateNewMessage(
            Message<?> message,
            Authentication auth
    ) {
        return new Message<>() {
            @Override
            @NonNull
            public PreSendMessage<?> getPayload() {
                return new PreSendMessage<>(auth, message.getPayload());
            }

            @Override
            @NonNull
            public MessageHeaders getHeaders() {
                return message.getHeaders();
            }
        };
    }
}
