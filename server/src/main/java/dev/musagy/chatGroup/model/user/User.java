package dev.musagy.chatGroup.model.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Getter
@Builder
@NoArgsConstructor
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
    @Column(name = "user_alias")
    private String userAlias;
    // Este tiene que ser hasheado
    private String password;
    // Role (por defecto USER)
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(SignUpRequest user, String passwordEncrypt, Role role) {
        this.email = user.email();
        this.username = user.username();
        this.userAlias = user.userAlias();
        this.password = passwordEncrypt;
        this.role = role;
    }
    public User(SignUpRequest user, String passwordEncrypt) {
        this.email = user.email();
        this.username = user.username();
        this.userAlias = user.userAlias();
        this.password = passwordEncrypt;
        this.role = Role.USER;
    }
}
