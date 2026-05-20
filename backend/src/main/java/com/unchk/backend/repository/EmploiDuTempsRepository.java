package com.unchk.backend.repository;

import com.unchk.backend.entity.EmploiDuTemps;

import org.springframework.data.jpa.repository.JpaRepository;

// Repository emploi du temps
public interface EmploiDuTempsRepository
        extends JpaRepository<EmploiDuTemps, Long> {
}