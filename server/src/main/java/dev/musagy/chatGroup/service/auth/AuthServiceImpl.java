package dev.musagy.chatGroup.service.auth;

import dev.musagy.chatGroup.model.user.SignInRequest;
import dev.musagy.chatGroup.model.user.SignInOrSignUpResponse;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.security.UserPrincipal;
import dev.musagy.chatGroup.security.jwt.JwtProvider;
import dev.musagy.chatGroup.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserService userService;

    @Override
    public SignInOrSignUpResponse signIm(SignInRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.usernameOrEmail(),req.password())
        );

        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        String jwt = jwtProvider.generateToken(userPrincipal);

        return new SignInOrSignUpResponse(userPrincipal.getUser(), jwt);
    }

    @Override
    public SignInOrSignUpResponse signUp(SignUpRequest req) {
        User user = userService.saveUser(req);

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword())
        );

        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        String jwt = jwtProvider.generateToken(userPrincipal);

        return new SignInOrSignUpResponse(userPrincipal.getUser(), jwt);
    }
}
