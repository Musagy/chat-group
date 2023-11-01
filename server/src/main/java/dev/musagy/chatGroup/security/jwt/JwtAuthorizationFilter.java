package dev.musagy.chatGroup.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest req,
            @NonNull HttpServletResponse res,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            Authentication auth = jwtProvider.getAuthentication(req);
            if (auth != null && jwtProvider.isTokenValid(req)) {
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch ( Exception ignored) {
        } finally {
            filterChain.doFilter(req, res);
        }
    }
}
