package com.unchk.backend.repository;

import com.unchk.backend.entity.Stage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StageRepository
        extends JpaRepository<Stage, Long> {
}