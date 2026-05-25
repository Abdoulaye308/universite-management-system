package com.unchk.backend.repository;

import com.unchk.backend.entity.Inscription;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscriptionRepository
        extends JpaRepository<Inscription, Long> {

    // Inscriptions étudiant
    List<Inscription> findByStudentId(Long studentId);

    // Inscriptions formation
    List<Inscription> findByFormationId(Long formationId);
}