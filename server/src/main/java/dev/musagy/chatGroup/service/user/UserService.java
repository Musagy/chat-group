package dev.musagy.chatGroup.service.user;

import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.model.user.SignUpResponse;

public interface UserService {
    SignUpResponse signUp(SignUpRequest req);
}
