package dev.musagy.chatGroup.controller;

import dev.musagy.chatGroup.model.user.SignInOrSignUpResponse;
import dev.musagy.chatGroup.model.user.SignInRequest;
import dev.musagy.chatGroup.model.user.SignUpRequest;
import dev.musagy.chatGroup.service.auth.AuthService;
import dev.musagy.chatGroup.utils.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        SignInOrSignUpResponse res = authService.signIn(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/validate")
    public ResponseEntity<SignInOrSignUpResponse> validate() {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();
        SignInOrSignUpResponse res = authService.validate(requesterId);
        return ResponseEntity.ok(res);
    }
}
