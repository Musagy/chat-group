package dev.musagy.chatGroup.model.chat;

import dev.musagy.chatGroup.model.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "chat_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"user", "chat"})
@IdClass(ChatUserPK.class)
public class ChatUser {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="chat_id")
    private Chat chat;

    @Enumerated(EnumType.STRING)
    private ChatRole role; // ADMIN, MEMBER, OWNER
}

