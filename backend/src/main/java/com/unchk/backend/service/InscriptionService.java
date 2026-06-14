package com.unchk.backend.service;

import com.unchk.backend.entity.Inscription;
import com.unchk.backend.repository.InscriptionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InscriptionService {

    private final InscriptionRepository repository;

    // AJOUT
    public Inscription save(
            Inscription inscription
    ) {

        return repository.save(inscription);
    }

    // LISTE
    public List<Inscription> getAll() {

        return repository.findAll();
    }

    // PAR ID
    public Inscription getById(
            Long id
    ) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Inscription introuvable"
                        ));
    }

    // UPDATE

    public Inscription update(
            Long id,
            Inscription details
    ) {

        Inscription inscription =
                getById(id);

        inscription.setStudentId(
                details.getStudentId()
        );

        inscription.setFormationId(
                details.getFormationId()
        );

        return repository.save(
                inscription
        );
    }

    // DELETE

    public void delete(
            Long id
    ) {

        repository.deleteById(id);
    }

    // PAR ETUDIANT

    public List<Inscription> getByStudent(
            Long studentId
    ) {

        return repository.findByStudentId(
                studentId
        );
    }

    // PAR FORMATION
    public List<Inscription> getByFormation(
            Long formationId
    ) {

        return repository.findByFormationId(
                formationId
        );
    }
}