package com.unchk.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration // Indique que cette classe contient une configuration Spring
public class SecurityConfig {

    // Bean pour encoder les mots de passe
    @Bean
    public PasswordEncoder passwordEncoder() {

        // BCrypt = méthode sécurisée pour stocker les mots de passe
        return new BCryptPasswordEncoder();
    }

    // Configuration de la sécurité
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> {})
                // Désactive CSRF pour simplifier les tests API
                .csrf(csrf -> csrf.disable())

                // Autorise toutes les requêtes sans authentification
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )

                // Désactive le formulaire login par défaut de Spring
                .formLogin(form -> form.disable());

        return http.build();
    }
}