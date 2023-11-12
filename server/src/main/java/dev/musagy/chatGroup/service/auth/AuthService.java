package dev.musagy.chatGroup.service.auth;

import dev.musagy.chatGroup.model.user.SignInOrSignUpResponse;
import dev.musagy.chatGroup.model.user.SignInRequest;
import dev.musagy.chatGroup.model.user.SignUpRequest;

public interface AuthService {
    SignInOrSignUpResponse signIn(SignInRequest req);

    SignInOrSignUpResponse signUp(SignUpRequest req);

    SignInOrSignUpResponse validate(Long requesterId);
}
