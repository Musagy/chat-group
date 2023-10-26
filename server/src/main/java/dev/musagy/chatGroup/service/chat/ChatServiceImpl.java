package dev.musagy.chatGroup.service.chat;

import dev.musagy.chatGroup.model.chat.*;
import dev.musagy.chatGroup.model.user.Role;
import dev.musagy.chatGroup.model.user.User;
import dev.musagy.chatGroup.repository.ChatRepository;
import dev.musagy.chatGroup.repository.ChatUserRepository;
import dev.musagy.chatGroup.security.error.InsufficientPrivilegesException;
import dev.musagy.chatGroup.security.error.ResourceNotFoundException;
import dev.musagy.chatGroup.service.user.UserService;
import dev.musagy.chatGroup.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatRepository chatRepo;
    @Autowired
    private ChatUserRepository cuRepo;
    @Autowired
    private UserService userService;

    @Transactional
    @Override
    public Page<Chat> findChatsPageByUserId(long userId, Pageable pageable) {
        Page<Chat> chats = chatRepo.findChatsPageByUserId(userId, pageable);

        if (chats.getSize() == 0)
            throw new ResourceNotFoundException("Parece que ya no hay mas objetos que devolver");

        return chats;
    }

    @Override
    public Chat createChat(CreateChatRequest req, Long requesterId) {
        Chat requestChat = new Chat(null, req.title(), req.description(), requesterId);
        Chat newChat = chatRepo.save(requestChat);
        User user = SecurityUtils.getAuthenticatedUser().getUser();
        addOwner(new ChatUser(user, newChat, null));
        return newChat;
    }

    @Override
    public void deleteChat(Long chatId, Long ownerId) {
        Chat chat = findByIdInServer(chatId);

        if (!ownerId.equals(chat.getOwnerId()))
            throw new InsufficientPrivilegesException("Para eliminar este chat necesitas ser su creador");

        chatRepo.deleteById(chatId);
    }

    @Override
    public Chat findById(Long chatId, Long userId) {
        Chat chat = chatRepo.findById(chatId)
                .orElseThrow(()-> new ResourceNotFoundException("No se encontró un chat con esta ID"));

        permissionEvaluator(chatId, userId);

        return chat;
    }

    private Chat findByIdInServer(Long chatId) {
        return chatRepo.findById(chatId)
                .orElseThrow(()-> new ResourceNotFoundException("No se encontró un chat con esta ID"));
    }

    @Transactional
    @Override
    public Page<UserSummary> findUserSummariesPageByChatId(Long chatId, Pageable pageable) {
        return chatRepo.findUserSummariesPageByChatId(chatId, pageable);
    }

    @Override
    public ChatUser addMemberByCUPK(ChatUserPK chatUserPK, Long requesterId) {
        validateRequesterAuthorization(requesterId, chatUserPK.getChat(), ChatRole.ADMIN);

        User user = userService.findById(chatUserPK.getUser());
        Chat chat = findByIdInServer(chatUserPK.getChat());
        ChatUser newRelationship = new ChatUser(user, chat, ChatRole.MEMBER);

        return cuRepo.save(newRelationship);
    }

    @Override
    public void addOwner(ChatUser chatUser) {
        chatUser.setRole(ChatRole.OWNER);
        cuRepo.save(chatUser);
    }

    @Override
    public void deleteMemberByCUPK(ChatUserPK chatUserPK, Long requesterId) {
        validateRequesterAuthorization(requesterId, chatUserPK.getChat(), ChatRole.ADMIN);

        cuRepo.deleteById(chatUserPK);
    }

    private boolean isMember(ChatUserPK chatUserPK) {
        return cuRepo.findById(chatUserPK).isPresent();
    }

    @Override
    public void changeRole(ChatUserPK chatUserPK, Long requesterId, ChatRole role) {
        validateRequesterAuthorization(requesterId, chatUserPK.getChat(),ChatRole.OWNER);

        if(role == ChatRole.OWNER)
            throw new IllegalArgumentException("No se como has llegado acá pero " +
                    "solo puede haber un Owner y ese eres tu. xD");
        if(requesterId.equals(chatUserPK.getUser()))
            throw new IllegalArgumentException("Que haces chupapi, " +
                    "¿Quieres dejar al Chat sin propietario?");

        ChatUser chatUser = cuRepo.findById(chatUserPK).
                orElseThrow(() -> new ResourceNotFoundException("No se encontró al miembro"));

        chatUser.setRole(role);

        cuRepo.save(chatUser);
    }

    private void validateRequesterAuthorization(Long requesterId, Long chatId, ChatRole minRole) {
        ChatRole role = cuRepo
                .findById(new ChatUserPK(requesterId, chatId))
                .orElseThrow(() -> new ResourceNotFoundException(
                        "La ID del solicitante no coincide con ninguna relación con el chat"
                ))
                .getRole();

        if (role.ordinal() < minRole.ordinal())
            throw new InsufficientPrivilegesException("Necesitas un role " + minRole + " o superior");
    }

    private void permissionEvaluator (Long chatId, Long userId){
        boolean isMember = isMember(new ChatUserPK(userId, chatId));

        if (!isMember) {
            Role userRole = SecurityUtils.getAuthenticatedRole();

            if (userRole == Role.USER)
                throw new InsufficientPrivilegesException("No eres miembro de este chat");
        }
    }
}