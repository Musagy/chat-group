package dev.musagy.chatGroup.controller;

import dev.musagy.chatGroup.model.chat.*;
import dev.musagy.chatGroup.service.chat.ChatService;
import dev.musagy.chatGroup.utils.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/chat")
public class ChatCtrl {
    @Autowired
    private ChatService chatService;

    @GetMapping("/get-chats") // init index is 0
    public ResponseEntity<Page<Chat>> getChatsPage (
            @RequestParam int page,
            @RequestParam String search
    ) {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();
        Pageable pageable = PageRequest.of(page,10);

        Page<Chat> chats = chatService.findChatsPageByUserId(requesterId, pageable, search);

        return ResponseEntity.ok(chats);
    }

    @PostMapping("/create-chat")
    public ResponseEntity<Chat> createChat(
            @Valid @RequestBody CreateChatRequest req,
            UriComponentsBuilder uriComponentsBuilder
    ) {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();
        Chat newChat = chatService.createChat(req,requesterId);

        URI url = uriComponentsBuilder
                .path("/chat/{id}")
                .buildAndExpand(newChat.getId())
                .toUri();

        return ResponseEntity.created(url).body(newChat);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<ChatWithRequesterRole> getChatById(@PathVariable Long chatId) {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();

        ChatWithRequesterRole chatWithRequesterRole = chatService.findById(chatId, requesterId);
        return ResponseEntity.ok(chatWithRequesterRole);
    }

    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long chatId) {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();

        chatService.deleteChat(chatId, requesterId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get-members/{chatId}")
    public ResponseEntity<Page<MemberSummary>> getMembersPage(
            @PathVariable Long chatId,
            @RequestParam int page
    ) {
        Pageable pageable = PageRequest.of(page,20);

        Page<MemberSummary> members =  chatService.findUserSummariesPageByChatId(chatId, pageable);
        return ResponseEntity.ok(members);
    }

    @PostMapping("/add-member")
    public ResponseEntity<ChatUser> addMember(@Valid @RequestBody AddMemberRequest req) {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();
        ChatUser newMember = chatService.addMemberByUsernameAndChatId(req.chatId(), req.username(), requesterId);

        return ResponseEntity.status(HttpStatus.CREATED).body(newMember);
    }

    @DeleteMapping("/delete-member")
    public ResponseEntity<Void> deleteMember(@Valid @RequestBody ChatUserPK req) {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();
        chatService.deleteMemberByCUPK(req, requesterId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/change-role")
    public ResponseEntity<Void> changeRole(@Valid @RequestBody ChangeRoleRequest req) {
        Long requesterId = SecurityUtils.getAuthenticatedUserId();
        chatService.changeRole(req.chatUserPK(),requesterId,req.role());
        return ResponseEntity.noContent().build();
    }

}