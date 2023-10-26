package dev.musagy.chatGroup.service.user;

import dev.musagy.chatGroup.model.user.Role;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.repository.UserRepository;
import dev.musagy.chatGroup.security.error.ResourceNotFoundException;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveUser(SignUpRequest req) {
        if (req.username().contains("@"))
            throw new ValidationException("El username no pude contener \"@\"");

        if (existsByEmail(req.email()))
            throw new ValidationException("El email \"" + req.email() + "\" ya esta en uso");

        if (existsByUsername(req.username()))
            throw new ValidationException("El username \"" + req.username() + "\" ya esta en uso");

        String passwordEncrypt = passwordEncoder.encode(req.password());

        userRepo.save(new User(req, passwordEncrypt));
    }

    @Override
    public User findById(Long userId) {
        return userRepo.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("No se encontró el Usuario de esta ID"));
    }

    @Override
    public boolean existsByUsername(String username) {
        Optional<User> userList = userRepo.findByUsername(username);
        return userList.isPresent();
    }

    @Override
    public boolean existsByEmail(String email) {
        Optional<User> userList = userRepo.findByEmail(email);
        return userList.isPresent();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Transactional
    @Override
    public void changeRole(Role newRole, String username){
        userRepo.updateUserRole( username, newRole);
    }
}
