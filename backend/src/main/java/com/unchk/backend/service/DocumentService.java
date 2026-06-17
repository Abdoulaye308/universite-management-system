package com.unchk.backend.service;

import com.unchk.backend.entity.Document;
import com.unchk.backend.repository.DocumentRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import com.unchk.backend.entity.Notification;
import com.unchk.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository repository;
    private final NotificationRepository notificationRepository;
    private final NotificationService notificationService;

    // Ajouter
    public Document save(Document document) {

        Document savedDocument =
                repository.save(document);

        Notification notification =
                Notification.builder()
                        .titre("Nouveau document")
                        .message(
                                "Le document \""
                                        + document.getTitre()
                                        + "\" a été ajouté."
                        )
                        .roleCible(
                                document.getRoleCible()
                        )
                        .dateCreation(
                                LocalDate.now().toString()
                        )
                        .build();

        notificationService.save(
                notification
        );

        return savedDocument;
    }

    // Liste
    public List<Document> getAll() {

        return repository.findAll();
    }

    // Documents par role
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

// UPDATE
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

        // Sauvegarde document
        Document updatedDocument =
                repository.save(document);

        // Création notification
        Notification notification =
                Notification.builder()
                        .titre(
                                "Document modifié"
                        )
                        .message(
                                "Le document \""
                                        + document.getTitre()
                                        + "\" a été mis à jour."
                        )
                        .roleCible(
                                document.getRoleCible()
                        )
                        .dateCreation(
                                java.time.LocalDate.now()
                                        .toString()
                        )
                        .build();

        notificationService.save(
                notification
        );

        return updatedDocument;
    }
}