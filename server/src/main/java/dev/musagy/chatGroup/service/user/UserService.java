package dev.musagy.chatGroup.service.user;

import dev.musagy.chatGroup.model.user.Role;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserService {
    User saveUser(SignUpRequest req);

    Optional<User> findByUsername(String username);

    @Transactional
    void changeRole(Role newRole, String username);
}
