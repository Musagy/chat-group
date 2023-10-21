package dev.musagy.chatGroup.security.error;

import org.springframework.validation.FieldError;

public record VisibleErrorData(String field, String message) {
    VisibleErrorData(FieldError e) {
        this(e.getField(), e.getDefaultMessage());
    }
}
