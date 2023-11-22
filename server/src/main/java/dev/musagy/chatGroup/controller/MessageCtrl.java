package dev.musagy.chatGroup.controller;

import dev.musagy.chatGroup.model.message.MessageWithUserInfo;
import dev.musagy.chatGroup.service.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/message")
public class MessageCtrl {
    @Autowired
    private MessageService messageService;

    @GetMapping("/get-messages/{chatId}")
    public ResponseEntity<Page<MessageWithUserInfo>> getMessagesPage (
            @PathVariable Long chatId,
            @RequestParam String since,
            @RequestParam int page
    ) throws ParseException {
        Pageable pageable = PageRequest.of(page,20);

        SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        Date sinceInDate = isoFormat.parse(since);

        Page<MessageWithUserInfo> messages = messageService.findMessagesPage(chatId, sinceInDate, pageable);
        return ResponseEntity.ok(messages);
    }
}
