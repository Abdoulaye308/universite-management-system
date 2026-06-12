package com.unchk.backend.service;

import com.unchk.backend.entity.AdministrationDocument;
import com.unchk.backend.repository.AdministrationDocumentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdministrationDocumentService {

    private final AdministrationDocumentRepository repository;

    // Ajouter
    public AdministrationDocument save(
            AdministrationDocument document
    ) {
        return repository.save(document);
    }

    // Liste
    public List<AdministrationDocument> getAll() {
        return repository.findAll();
    }

    // Par ID
    public AdministrationDocument getById(
            Long id
    ) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Document introuvable"
                        ));
    }

    // Modifier
    public AdministrationDocument update(
            Long id,
            AdministrationDocument details
    ) {

        AdministrationDocument document =
                getById(id);

        document.setType(
                details.getType()
        );

        document.setTitre(
                details.getTitre()
        );

        document.setContenu(
                details.getContenu()
        );

        document.setDateCreation(
                details.getDateCreation()
        );

        return repository.save(
                document
        );
    }

    // Supprimer
    public void delete(
            Long id
    ) {
        repository.deleteById(id);
    }
}