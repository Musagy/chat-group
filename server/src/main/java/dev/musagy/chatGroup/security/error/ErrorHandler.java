package dev.musagy.chatGroup.security.error;

import jakarta.validation.ValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<String> errorValidationException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<VisibleErrorData>> errorArgNotValid(MethodArgumentNotValidException e) {
        var listError = e.getFieldErrors()
                .stream()
                .map(VisibleErrorData::new).toList();

        return ResponseEntity.badRequest()
                .body(listError);
    }
}
