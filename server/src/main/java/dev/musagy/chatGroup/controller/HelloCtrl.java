package dev.musagy.chatGroup.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloCtrl {
    @GetMapping
    public String helloChupapi() {
        return "hola chupapis";
    }
}
