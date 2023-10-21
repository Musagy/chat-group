package dev.musagy.chatGroup.service.user;

import dev.musagy.chatGroup.model.user.Role;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.repository.UserRepository;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(SignUpRequest req) {
        if (req.username().contains("@"))
            throw new ValidationException("El username no pude contener \"@\"");

        if (existsByEmail(req.email()))
            throw new ValidationException("El email \"" + req.email() + "\" ya esta en uso");

        if (existsByUsername(req.username()))
            throw new ValidationException("El username \"" + req.username() + "\" ya esta en uso");

        String passwordEncrypt = passwordEncoder.encode(req.password());

        return userRepository
                .save(new User(req, passwordEncrypt));
    }

    @Override
    public boolean existsByUsername(String username) {
        Optional<User> userList = userRepository.findByUsername(username);
        return userList.isPresent();
    }

    @Override
    public boolean existsByEmail(String email) {
        Optional<User> userList = userRepository.findByEmail(email);
        return userList.isPresent();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    @Override
    public void changeRole(Role newRole, String username){
        userRepository.updateUserRole( username, newRole);
    }
}
