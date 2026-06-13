package com.unchk.backend.service;

import com.unchk.backend.entity.Insertion;
import com.unchk.backend.repository.InsertionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InsertionService {

    private final InsertionRepository repository;

    // =========================
    // AJOUT
    // =========================

    public Insertion save(
            Insertion insertion
    ) {

        return repository.save(
                insertion
        );
    }

    // =========================
    // LISTE
    // =========================

    public List<Insertion> getAll() {

        return repository.findAll();
    }

    // =========================
    // PAR ID
    // =========================

    public Insertion getById(
            Long id
    ) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Insertion introuvable"
                        ));
    }

    // =========================
    // UPDATE
    // =========================

    public Insertion update(
            Long id,
            Insertion details
    ) {

        Insertion insertion =
                getById(id);

        insertion.setStudentId(
                details.getStudentId()
        );

        insertion.setEtudiant(
                details.getEtudiant()
        );

        insertion.setFormation(
                details.getFormation()
        );

        insertion.setTypeInsertion(
                details.getTypeInsertion()
        );

        insertion.setEntreprise(
                details.getEntreprise()
        );

        insertion.setPoste(
                details.getPoste()
        );

        insertion.setDateInsertion(
                details.getDateInsertion()
        );
        insertion.setCommentaire(
                details.getCommentaire()
        );

        return repository.save(
                insertion
        );
    }

    // =========================
    // DELETE
    // =========================

    public void delete(
            Long id
    ) {

        repository.deleteById(id);
    }
}