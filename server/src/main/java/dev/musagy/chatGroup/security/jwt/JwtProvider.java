package dev.musagy.chatGroup.security.jwt;

import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface JwtProvider {
    Authentication getAuthentication(HttpServletRequest req);

    boolean isTokenValid(HttpServletRequest req);

    String generateToken(UserPrincipal auth);

    String generateToken(User user);

    String getUsername(String token);
}
