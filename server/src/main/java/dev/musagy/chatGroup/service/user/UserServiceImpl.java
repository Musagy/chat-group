package dev.musagy.chatGroup.service.user;

import dev.musagy.chatGroup.model.user.Role;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private JwtP

    @Override
    public User saveUser(SignUpRequest req) {
        String passwordEncrypt = passwordEncoder.encode(req.password());

        return userRepository
                .save(new User(req, passwordEncrypt));
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    @Override
    public void changeRole(Role newRole, String username){
        userRepository.updateUserRole( username, newRole);
    }
}
