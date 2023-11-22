package dev.musagy.chatGroup.config;

import dev.musagy.chatGroup.security.jwt.JwtProvider;
import dev.musagy.chatGroup.utils.WebSocketUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.web.socket.config.annotation.*;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/send");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/msg")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<PreSendMessage<?>> preSend(Message<?> message, MessageChannel channel) {
                System.out.println("iniciando preSend");
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

                System.out.println("tipo: " + accessor.getCommand());

                if (!StompCommand.SEND.equals(accessor.getCommand()) || !accessor.containsNativeHeader("Authorization"))
                    return WebSocketUtils.CreateNewMessage(message, null);

                Authentication auth = jwtProvider.getAuthenticationForWebSocket(accessor);
                Message<PreSendMessage<?>> newMessage= WebSocketUtils.CreateNewMessage(message, auth);
                System.out.println("newMessage in preSend = " + newMessage);
                return newMessage;
            }
        });
    }
}
