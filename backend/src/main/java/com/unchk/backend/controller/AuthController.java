package com.unchk.backend.controller;

import com.unchk.backend.dto.AuthResponse;
import com.unchk.backend.dto.LoginRequest;
import com.unchk.backend.dto.RegisterRequest;

import com.unchk.backend.entity.User;

import com.unchk.backend.repository.UserRepository;

import com.unchk.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController // Indique que cette classe expose des API REST
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    // Injection du repository utilisateur
    private final UserRepository userRepository;

    // Injection encodeur mot de passe
    private final PasswordEncoder passwordEncoder;

    // Injection service JWT
    private final JwtService jwtService;

    // API inscription
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        // Vérifie si email existe déjà
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            return "Cet email existe déjà";
        }

        // Création utilisateur
        User user = User.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())

                // Mot de passe crypté
                .password(passwordEncoder.encode(request.getPassword()))

                .role(request.getRole())
                .build();

        // Sauvegarde base
        userRepository.save(user);

        return "Utilisateur enregistré avec succès";
    }

    // API connexion
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        // Recherche utilisateur par email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        // Vérification mot de passe
        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        // Si mot de passe incorrect
        if (!passwordMatches) {

            throw new RuntimeException("Mot de passe incorrect");
        }

        // Génération token JWT
        String token = jwtService.generateToken(user.getEmail());

        // Retour token
        return new AuthResponse(token);
    }
}