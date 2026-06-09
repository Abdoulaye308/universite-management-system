package com.unchk.backend.service;

import com.unchk.backend.entity.Document;
import com.unchk.backend.repository.DocumentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository repository;

    // Ajouter
    public Document save(Document document) {

        return repository.save(document);
    }

    // Liste
    public List<Document> getAll() {

        return repository.findAll();
    }

    // Documents par rôle
    public List<Document> getByRole(
            String role
    ) {

        return repository.findByRoleCible(role);
    }

    // Recherche ID
    public Document getById(
            Long id
    ) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Document introuvable"
                        ));
    }

    // Suppression
    public void delete(Long id) {

        repository.deleteById(id);
    }

    // =========================
// UPDATE
// =========================
    public Document update(
            Long id,
            Document details
    ) {

        Document document = getById(id);

        document.setTitre(
                details.getTitre()
        );

        document.setType(
                details.getType()
        );

        document.setDescription(
                details.getDescription()
        );

        document.setRoleCible(
                details.getRoleCible()
        );

        document.setDateCreation(
                details.getDateCreation()
        );

        return repository.save(document);
    }
}