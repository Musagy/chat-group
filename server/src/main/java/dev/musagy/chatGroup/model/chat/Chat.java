package dev.musagy.chatGroup.model.chat;

import dev.musagy.chatGroup.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Entity
@Table(name = "chat")
@Getter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relaciones Many to Many

    @OneToMany
    @JoinTable(
            name = "chat_user",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> whiteList;
}
