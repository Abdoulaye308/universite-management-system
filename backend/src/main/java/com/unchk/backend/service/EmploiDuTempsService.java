package com.unchk.backend.service;

import com.unchk.backend.entity.EmploiDuTemps;

import com.unchk.backend.repository.EmploiDuTempsRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmploiDuTempsService {

    // Injection repository
    private final EmploiDuTempsRepository repository;

    // Ajouter séance
    public EmploiDuTemps save(EmploiDuTemps emploi) {

        return repository.save(emploi);
    }

    // Liste emplois du temps
    public List<EmploiDuTemps> getAll() {

        return repository.findAll();
    }

    // Rechercher par ID
    public EmploiDuTemps getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Emploi du temps introuvable"
                        ));
    }

    // Modifier
    public EmploiDuTemps update(
            Long id,
            EmploiDuTemps details
    ) {

        EmploiDuTemps emploi = getById(id);

        emploi.setFormation(details.getFormation());
        emploi.setJour(details.getJour());
        emploi.setHeureDebut(details.getHeureDebut());
        emploi.setHeureFin(details.getHeureFin());
        emploi.setSalle(details.getSalle());
        emploi.setModule(details.getModule());
        emploi.setEnseignant(details.getEnseignant());

        return repository.save(emploi);
    }

    // Supprimer
    public void delete(Long id) {

        repository.deleteById(id);
    }
}