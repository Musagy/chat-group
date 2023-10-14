package dev.musagy.chatGroup.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Entity
@Table(name = "user")
@Getter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    // Nombre único
    private String username;
    // Nombre visible para cualquier otro y se puede repetir con otros usuarios
    private String userAlias;
    // Este tiene que ser hasheado
    private String password;
}
