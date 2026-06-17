package com.unchk.backend.repository;

import com.unchk.backend.entity.Formation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationRepository
        extends JpaRepository<Formation, Long> {
}