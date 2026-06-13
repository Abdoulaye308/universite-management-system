package com.unchk.backend.controller;

import com.unchk.backend.entity.User;

import com.unchk.backend.repository.UserRepository;

import com.unchk.backend.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    // Injection repository
    private final UserRepository userRepository;
    private final UserService service;

    // Encodeur password
    private final PasswordEncoder passwordEncoder;

    // =========================
    // LISTE UTILISATEURS
    // =========================
    @GetMapping
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // AJOUTER UTILISATEUR
    @PostMapping
    public User createUser(
            @RequestBody User user
    ) {

        // Crypter mot de passe
        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(user);
    }

    // =========================
    // MODIFIER UTILISATEUR
    // =========================
    @PutMapping("/{id}")
    public User updateUser(

            @PathVariable Long id,

            @RequestBody User updatedUser
    ) {

        User user = userRepository.findById(id)
                .orElseThrow();

        user.setNom(updatedUser.getNom());

        user.setPrenom(updatedUser.getPrenom());

        user.setEmail(updatedUser.getEmail());

        user.setRole(updatedUser.getRole());

        user.setService(updatedUser.getService());

        // Modifier password seulement si rempli
        if (
                updatedUser.getPassword() != null &&
                        !updatedUser.getPassword().isEmpty()
        ) {

            user.setPassword(
                    passwordEncoder.encode(
                            updatedUser.getPassword()
                    )
            );
        }

        return userRepository.save(user);
    }

    // =========================
    // SUPPRIMER UTILISATEUR
    // =========================
    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id
    ) {

        userRepository.deleteById(id);

        return "Utilisateur supprimé";
    }

    // =========================
    // RECHERCHE EMAIL
    // =========================

    @GetMapping("/email/{email}")
    public User getByEmail(
            @PathVariable String email
    ) {

        return service.getByEmail(email);
    }

}