package com.unchk.backend.security;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import java.security.Key;

import java.util.Date;

@Service
public class JwtService {

    // Clé secrète JWT sécurisée
    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey123456789";

    // Conversion en clé sécurisée
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Génération token JWT
    public String generateToken(String email) {

        return Jwts.builder()

                // Email utilisateur
                .setSubject(email)

                // Date création token
                .setIssuedAt(new Date())

                // Expiration 24h
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)
                )

                // Signature sécurisée
                .signWith(key, SignatureAlgorithm.HS256)

                // Génération finale
                .compact();
    }
}