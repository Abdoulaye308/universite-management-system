package com.unchk.backend.service;

import com.unchk.backend.entity.Formation;

import com.unchk.backend.repository.FormationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service // Service métier
@RequiredArgsConstructor
public class FormationService {

    // Injection repository
    private final FormationRepository formationRepository;

    // Ajouter formation
    public Formation saveFormation(Formation formation) {

        return formationRepository.save(formation);
    }

    // Liste formations
    public List<Formation> getAllFormations() {

        return formationRepository.findAll();
    }

    // Rechercher formation par ID
    public Formation getFormationById(Long id) {

        return formationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Formation introuvable"));
    }

    // Modifier formation
    public Formation updateFormation(
            Long id,
            Formation formationDetails
    ) {

        Formation formation = getFormationById(id);

        formation.setNom(formationDetails.getNom());
        formation.setTypeFormation(
                formationDetails.getTypeFormation()
        );
        formation.setNiveau(formationDetails.getNiveau());
        formation.setDateDebut(
                formationDetails.getDateDebut()
        );
        formation.setDateFin(
                formationDetails.getDateFin()
        );
        formation.setFinancement(
                formationDetails.getFinancement()
        );
        formation.setNombreHommes(
                formationDetails.getNombreHommes()
        );
        formation.setNombreFemmes(
                formationDetails.getNombreFemmes()
        );

        return formationRepository.save(formation);
    }

    // Supprimer formation
    public void deleteFormation(Long id) {

        formationRepository.deleteById(id);
    }
}