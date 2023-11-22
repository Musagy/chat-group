package dev.musagy.chatGroup.security.jwt;

import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;

public interface JwtProvider {
    Authentication getAuthentication(HttpServletRequest req);

    Authentication getAuthenticationForWebSocket(StompHeaderAccessor accessor);

    Authentication getAuthenticationByString(String header);

    boolean isTokenValid(HttpServletRequest req);

    String generateToken(UserPrincipal auth);
    String generateToken(User User);

    String getUsername(String token);
}
