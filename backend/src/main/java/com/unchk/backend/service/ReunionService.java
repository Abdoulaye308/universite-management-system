package com.unchk.backend.service;

import com.unchk.backend.entity.Reunion;
import com.unchk.backend.entity.Notification;
import com.unchk.backend.repository.NotificationRepository;
import com.unchk.backend.repository.ReunionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReunionService {

    // Injection repository
    private final ReunionRepository repository;
    private final NotificationService notificationService;
    // Ajouter réunion
    public Reunion save(Reunion reunion) {

        Reunion savedReunion =
                repository.save(reunion);

        Notification notification =
                Notification.builder()
                        .titre("Nouvelle réunion")
                        .message(
                                "Nouvelle réunion : "
                                        + reunion.getSujet()
                        )
                        .roleCible("TOUS")
                        .dateCreation(
                                java.time.LocalDate.now()
                                        .toString()
                        )
                        .build();

        notificationService.save(
                notification
        );

        return savedReunion;
    }

    // Liste réunions
    public List<Reunion> getAll() {

        return repository.findAll();
    }

    // Réunion par ID
    public Reunion getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Réunion introuvable"
                        ));
    }

    // Modifier réunion
    public Reunion update(
            Long id,
            Reunion details
    ) {

        Reunion reunion = getById(id);

        reunion.setType(details.getType());
        reunion.setSujet(details.getSujet());
        reunion.setDate(details.getDate());
        reunion.setHeure(details.getHeure());
        reunion.setSalle(details.getSalle());
        reunion.setParticipants(details.getParticipants());
        reunion.setCompteRendu(details.getCompteRendu());

        reunion.setFormationId(details.getFormationId());
        reunion.setFormationNom(details.getFormationNom());

        reunion.setCible(
                details.getCible()
        );

        reunion.setServiceConcerne(
                details.getServiceConcerne()
        );

        Reunion updatedReunion =
                repository.save(reunion);

        Notification notification =
                Notification.builder()
                        .titre("Réunion modifiée")
                        .message(
                                "La réunion : "
                                        + reunion.getSujet()
                                        + " a été modifiée."
                        )
                        .roleCible("TOUS")
                        .dateCreation(
                                java.time.LocalDate.now()
                                        .toString()
                        )
                        .build();

        notificationService.save(
                notification
        );

        return updatedReunion;
    }
    // Supprimer réunion
    public void delete(Long id) {

        repository.deleteById(id);
    }
}