package dev.musagy.chatGroup.security;

import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

public class CustomAuthenticationManager implements AuthenticationManager {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private User findUser(String usernameOrEmail) throws UsernameNotFoundException {
        var userFound = userService.findByUsername(usernameOrEmail);

        if (userFound.isEmpty()) userFound = userService.findByEmail(usernameOrEmail);

        if (userFound.isEmpty())
            throw new UsernameNotFoundException("El usuario no fue encontrado: " + usernameOrEmail);

        return userFound.get();
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String usernameOrEmail = authentication.getName();
        String password = authentication.getCredentials().toString();

        User user = findUser(usernameOrEmail);

        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new BadCredentialsException("Contraseña incorrecta");

        UserDetails userDetails = UserPrincipal.builder()
                .user(user)
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();

        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }
}
