package dev.musagy.chatGroup.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.security.UserPrincipal;
import dev.musagy.chatGroup.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtProviderImpl implements JwtProvider{
    @Value("${api.jwt.secret}")
    private String JWT_SECRET;

    private Instant generateExpires() {
        return LocalDateTime.now()
                .plusHours(48)
                .toInstant(ZoneOffset.of("-05:00"));
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(JWT_SECRET);
    }

    private Map<String, Claim> extractClaims(HttpServletRequest req) {
        String token = SecurityUtils.extractAuthTokenFromRequest(req);

        if (token == null) return null;

        Algorithm algorithm = getAlgorithm();

        try {
            return JWT.require(algorithm)
                    .build()
                    .verify(token).getClaims();
        } catch (JWTVerificationException ex) {
            return null;
        }
    }

    @Override
    public String generateToken(UserPrincipal auth)  {
        try {
            String authorities = auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining());
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            return JWT.create()
                    .withIssuer("Musagy dev")
                    .withSubject(auth.getUsername())
                    .withClaim("roles", authorities)
                    .withClaim("userId", auth.getId())
                    .withExpiresAt(generateExpires())
                    .sign(algorithm);
        } catch (JWTCreationException ex) {
            throw new RuntimeException();
        }
    }

    @Override
    public String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);

        String authorities = Collections
                .singletonList(user.getRole())
                .toString();

        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("roles", authorities)
                .withClaim("userId", user.getId())
                .withExpiresAt(generateExpires())
                .sign(algorithm);
    }

    @Override
    public Authentication getAuthentication(HttpServletRequest req) {
        var claims = extractClaims(req);

        if (claims == null || claims.isEmpty()) return null;

        String username = claims.get("sub").asString();
        if (username == null) return null;

        Long userId = claims.get("userId").asLong();

        Set<GrantedAuthority> authorities = Arrays
                .stream(claims.get("roles").toString().split(","))
                .map(SecurityUtils::convertToAuthority)
                .collect(Collectors.toSet());

        UserDetails userDetails = UserPrincipal.builder()
                .username(username)
                .authorities(authorities)
                .id(userId)
                .build();

        return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
    }

    @Override
    public boolean isTokenValid(HttpServletRequest req) {
        var claims = extractClaims(req);

        if (claims == null || claims.isEmpty()) return false;

        return !claims.get("exp").asDate().before(new Date());
    }

}
