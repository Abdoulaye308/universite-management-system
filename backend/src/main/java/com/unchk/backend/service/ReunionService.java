package com.unchk.backend.service;

import com.unchk.backend.entity.Reunion;

import com.unchk.backend.repository.ReunionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReunionService {

    // Injection repository
    private final ReunionRepository repository;

    // Ajouter réunion
    public Reunion save(Reunion reunion) {

        return repository.save(reunion);
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

        return repository.save(reunion);
    }

    // Supprimer réunion
    public void delete(Long id) {

        repository.deleteById(id);
    }
}