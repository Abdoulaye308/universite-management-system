package com.unchk.backend.service;

import com.unchk.backend.entity.Stage;
import com.unchk.backend.repository.StageRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StageService {

    private final StageRepository repository;

    // AJOUT
    public Stage save(Stage stage) {

        return repository.save(stage);
    }

    // LISTE
    public List<Stage> getAll() {

        return repository.findAll();
    }

    // PAR ID
    public Stage getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Stage introuvable"
                        ));
    }

    // UPDATE
    public Stage update(
            Long id,
            Stage details
    ) {

        Stage stage = getById(id);

        stage.setStudentId(
                details.getStudentId()
        );

        stage.setEtudiant(
                details.getEtudiant()
        );

        stage.setFormation(
                details.getFormation()
        );

        stage.setPartenaireId(
                details.getPartenaireId()
        );

        stage.setOrganisme(
                details.getOrganisme()
        );

        stage.setDateDebut(
                details.getDateDebut()
        );

        stage.setDateFin(
                details.getDateFin()
        );

        stage.setStatut(
                details.getStatut()
        );

        stage.setBilan(
                details.getBilan()
        );

        return repository.save(stage);
    }

    // DELETE
    public void delete(Long id) {

        repository.deleteById(id);
    }
}