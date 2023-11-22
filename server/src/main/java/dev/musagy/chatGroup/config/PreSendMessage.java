package dev.musagy.chatGroup.config;

import org.springframework.security.core.Authentication;

public record PreSendMessage<T> (
        Authentication auth,
        T req
) {
}
