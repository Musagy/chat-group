package dev.musagy.chatGroup.service.auth;

import dev.musagy.chatGroup.model.user.SignInRequest;
import dev.musagy.chatGroup.model.user.SignInOrSignUpResponse;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.security.UserPrincipal;
import dev.musagy.chatGroup.security.jwt.JwtProvider;
import dev.musagy.chatGroup.service.user.UserService;
import dev.musagy.chatGroup.utils.ObjectToRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserService userService;

    @Override
    public SignInOrSignUpResponse signIn(SignInRequest req) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(
                req.usernameOrEmail(),
                req.password()
        );

        UserPrincipal user = (UserPrincipal) authManager.authenticate(authToken).getPrincipal();
        String jwt = jwtProvider.generateToken(user);

        return new SignInOrSignUpResponse(jwt, ObjectToRecord.userToUserSummary(user.getUser()));
    }

    @Override
    public SignInOrSignUpResponse signUp(SignUpRequest req) {
        userService.saveUser(req);
        return signIn(new SignInRequest(
                req.username(),
                req.password())
        );
    }

    @Override
    public SignInOrSignUpResponse validate(Long requesterId) {
        User user = userService.findById(requesterId);
        String jwt = jwtProvider.generateToken(user);
        return new SignInOrSignUpResponse(jwt, null);
    }
}
