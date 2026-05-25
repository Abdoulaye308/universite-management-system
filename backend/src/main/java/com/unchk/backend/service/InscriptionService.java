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

    // Ajouter inscription
    public Inscription save(
            Inscription inscription
    ) {

        return repository.save(inscription);
    }

    // Liste
    public List<Inscription> getAll() {

        return repository.findAll();
    }

    // Supprimer
    public void delete(Long id) {

        repository.deleteById(id);
    }

    // Étudiant
    public List<Inscription> getByStudent(
            Long studentId
    ) {

        return repository.findByStudentId(studentId);
    }

    // Formation
    public List<Inscription> getByFormation(
            Long formationId
    ) {

        return repository.findByFormationId(
                formationId
        );
    }
}