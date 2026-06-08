package com.unchk.backend.service;

import com.unchk.backend.entity.Formateur;

import com.unchk.backend.repository.FormateurRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FormateurService {

    private final FormateurRepository repository;

    // Ajouter formateur
    public Formateur save(Formateur formateur) {

        return repository.save(formateur);
    }

    // Liste formateurs
    public List<Formateur> getAll() {

        return repository.findAll();
    }

    // Rechercher formateur par ID
    public Formateur getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Formateur introuvable"
                        ));
    }

    // Modifier formateur
    public Formateur update(
            Long id,
            Formateur details
    ) {

        // Recherche du formateur
        Formateur formateur = getById(id);

        // Mise à jour des champs
        formateur.setNom(details.getNom());
        formateur.setPrenom(details.getPrenom());
        formateur.setEmail(details.getEmail());
        formateur.setGrade(details.getGrade());
        formateur.setType(details.getType());
        formateur.setSpecialite(details.getSpecialite());

        // Sauvegarde
        return repository.save(formateur);
    }

    // Supprimer formateur
    public void delete(Long id) {

        repository.deleteById(id);
    }

    public Formateur getByEmail(
            String email
    ) {

        return repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Formateur introuvable"
                        ));
    }
}