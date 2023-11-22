package dev.musagy.chatGroup.model.message;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Date;

public record MessageRecord (
    Long id,
    String content,
    Date date,
    Long senderId,
    Long chatId
) {
}
