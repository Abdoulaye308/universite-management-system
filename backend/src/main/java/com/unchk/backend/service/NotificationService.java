package com.unchk.backend.service;

import com.unchk.backend.entity.Notification;
import com.unchk.backend.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;

    // Ajouter
    public Notification save(
            Notification notification
    ) {

        return repository.save(notification);
    }

// RECHERCHE PAR ID
    public Notification getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Notification introuvable"
                        ));
    }

    // Liste
    public List<Notification> getAll() {

        return repository.findAll();
    }

    // Par role
    public List<Notification> getByRole(
            String role
    ) {

        return repository.findByRoleCible(role);
    }

    // Modifier notification
    public Notification update(
            Long id,
            Notification details
    ) {

        Notification notification =
                getById(id);

        notification.setTitre(
                details.getTitre()
        );

        notification.setMessage(
                details.getMessage()
        );

        notification.setRoleCible(
                details.getRoleCible()
        );

        notification.setDateCreation(
                details.getDateCreation()
        );

        return repository.save(
                notification
        );
    }

    // Supprimer
    public void delete(
            Long id
    ) {

        repository.deleteById(id);
    }
}