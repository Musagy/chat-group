package dev.musagy.chatGroup.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.security.CustomUserDetailsService;
import dev.musagy.chatGroup.security.UserPrincipal;
import dev.musagy.chatGroup.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private CustomUserDetailsService userDetailsService;

    private Instant generateExpires() {
        return LocalDateTime.now()
                .plusHours(48)
                .toInstant(ZoneOffset.of("-05:00"));
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(JWT_SECRET);
    }

    private DecodedJWT extractClaims(HttpServletRequest req) {
        String token = SecurityUtils.extractAuthTokenFromRequest(req);

        return decodeToken(token);
    }
    private DecodedJWT decodeToken(String token) {
        if (token == null)
            throw new RuntimeException();

        DecodedJWT decodedJWT = null;
        try {
            Algorithm algorithm = getAlgorithm();
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("Musagy dev")
                    .build();

            decodedJWT = verifier.verify(token);
        } catch (JWTVerificationException exception){
            System.out.println(exception.toString());
        }
        if ((decodedJWT != null ? decodedJWT.getSubject() : null) == null)
            throw new RuntimeException("decodeJWT invalido");
        return decodedJWT;
    }

    @Override
    public String generateToken(UserPrincipal auth)  {
        try {
            String authorities = auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(","));
            Algorithm algorithm = getAlgorithm();
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
    public String getUsername(String token) {
        if (token == null)
            throw new RuntimeException();

        DecodedJWT decodedJWT = null;
        try {
            Algorithm algorithm = getAlgorithm();
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("Musagy dev")
                    .build();

            decodedJWT = verifier.verify(token);
        } catch (JWTVerificationException exception){
            System.out.println(exception.toString());
        }
        if ((decodedJWT != null ? decodedJWT.getSubject() : null) == null)
            throw new RuntimeException("decodeJWT invalido");
        return decodedJWT.getSubject();
    }

    @Override
    public Authentication getAuthentication(HttpServletRequest req) {
        var decodedJWT = extractClaims(req);

        String username = decodedJWT.getSubject();
        if (username == null) return null;

        UserPrincipal user = (UserPrincipal) userDetailsService.loadUserByUsername(username);

        UserDetails userDetails = UserPrincipal.builder()
                .user(user.getUser())
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();


        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public boolean isTokenValid(HttpServletRequest req) {
        var decodedJWT = extractClaims(req);

        return !decodedJWT.getExpiresAt().before(new Date());
    }

}
