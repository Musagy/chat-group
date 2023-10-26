package dev.musagy.chatGroup.model.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatUserPK implements Serializable {
    private Long user;
    private Long chat;
}
