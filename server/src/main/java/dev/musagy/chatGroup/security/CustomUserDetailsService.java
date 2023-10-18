package dev.musagy.chatGroup.security;

import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.service.user.UserService;
import dev.musagy.chatGroup.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    private User findUser(String usernameOrEmail) throws UsernameNotFoundException {
        var userFound = userService.findByUsername(usernameOrEmail);

        if (userFound.isEmpty()) userFound = userService.findByEmail(usernameOrEmail);

        if (userFound.isEmpty())
            throw new UsernameNotFoundException("el usuario no fue encontrado: " + usernameOrEmail);

        return userFound.get();
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = findUser(usernameOrEmail);

        Set<GrantedAuthority> authorities = Set.of(SecurityUtils
                .convertToAuthority(user.getRole().name())
        );

        return UserPrincipal.builder()
                .user(user)
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
}
