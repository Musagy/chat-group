package dev.musagy.chatGroup.controller;

import dev.musagy.chatGroup.model.user.SignInOrSignUpResponse;
import dev.musagy.chatGroup.model.user.SignInRequest;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.service.auth.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class AuthCtrl {
    @Autowired
    private AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<SignInOrSignUpResponse> signUp(@RequestBody @Valid SignUpRequest req) {
        SignInOrSignUpResponse res = authService.signUp(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInOrSignUpResponse> signIn(@RequestBody @Valid SignInRequest req) {
        SignInOrSignUpResponse res = authService.signIm(req);
        return ResponseEntity.ok(res);
    }
}
