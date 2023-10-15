package dev.musagy.chatGroup.service.user;

import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.SignUpResponse;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private JwtP

    @Override
    public SignUpResponse signUp(SignUpRequest req) {
        String passwordEncrypt = passwordEncoder.encode(req.password());
        var newUser = userRepository.save(
                new User(req, passwordEncrypt)
        );
        String jwt = "bearer hola_chupapis";
        return new SignUpResponse(newUser, jwt);
    }
}
