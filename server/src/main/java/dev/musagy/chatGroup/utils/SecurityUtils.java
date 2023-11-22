package dev.musagy.chatGroup.utils;

import dev.musagy.chatGroup.model.user.Role;
import dev.musagy.chatGroup.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

public class SecurityUtils {
    public static final String ROLE_PREFIX = "ROLE_";
    public static final String AUTH_HEADER = "Authorization";

    public static final String AUTH_TOKEN_TYPE = "Bearer";
    public static final String AUTH_TOKEN_PREFIX = AUTH_TOKEN_TYPE + " ";

    public static SimpleGrantedAuthority convertToAuthority(String role) {
        String formattedRole = role.startsWith(ROLE_PREFIX)
                ? role
                : ROLE_PREFIX + role;
        return new SimpleGrantedAuthority(formattedRole);
    }
    public static String extractAuthTokenFromRequest(HttpServletRequest req) {
        String bearerToken = req.getHeader(AUTH_HEADER);
        return extractAuthToken(bearerToken);
    }
    public static String extractAuthTokenFromAccessor(StompHeaderAccessor accessor) {
        String bearerToken = accessor.getFirstNativeHeader(AUTH_HEADER);
        return extractAuthToken(bearerToken);
    }
    public static String extractAuthToken(String bearerToken) {
        if(StringUtils.hasLength(bearerToken) && bearerToken.startsWith(AUTH_TOKEN_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }
    public static UserPrincipal getAuthenticatedUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return (UserPrincipal) auth.getPrincipal();
    }
    public static Long getAuthenticatedUserId() {
        return getAuthenticatedUser().getId();
    }
    public static Role getAuthenticatedRole() {
        String role = getAuthenticatedUser()
                .getAuthorities()
                .iterator()
                .next()
                .getAuthority();
        return Role.valueOf(role);
    }
}
