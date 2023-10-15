package dev.musagy.chatGroup.repository;

import dev.musagy.chatGroup.model.user.Role;
import dev.musagy.chatGroup.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Queries necesarias para el login opcional de:(username o email)
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // Query para setear role
    @Query("update User set role=:role where username=:username")
    void updateUserRole(@Param("username") String username, @Param("role")Role role);
}
