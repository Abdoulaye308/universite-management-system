package com.unchk.backend.service;

import com.unchk.backend.entity.User;
import com.unchk.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    // =========================
    // AJOUT
    // =========================
    public User save(User user) {

        return repository.save(user);
    }

    // =========================
    // LISTE
    // =========================
    public List<User> getAll() {

        return repository.findAll();
    }

    // =========================
    // RECHERCHE PAR ID
    // =========================
    public User getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Utilisateur introuvable"
                        ));
    }

    // =========================
    // RECHERCHE EMAIL
    // =========================
    public User getByEmail(String email) {

        return repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Utilisateur introuvable"
                        ));
    }

    // =========================
    // UPDATE
    // =========================
    public User update(
            Long id,
            User details
    ) {

        User user = getById(id);

        user.setNom(details.getNom());
        user.setPrenom(details.getPrenom());
        user.setEmail(details.getEmail());

        // Mot de passe seulement si renseigné
        if (details.getPassword() != null &&
                !details.getPassword().isEmpty()) {

            user.setPassword(details.getPassword());
        }

        user.setRole(details.getRole());

        // IMPORTANT
        user.setService(details.getService());

        return repository.save(user);
    }

    // =========================
    // DELETE
    // =========================
    public void delete(Long id) {

        repository.deleteById(id);
    }
}