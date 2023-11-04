package dev.musagy.chatGroup.controller;

//import dev.musagy.chatGroup.model.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MessageCtrl {
    @GetMapping("/message")
    public String sendMessage(@Payload String msg) {
        return "hola";
    }
}
