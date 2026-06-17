package com.unchk.backend.repository;

import com.unchk.backend.entity.Reunion;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReunionRepository
        extends JpaRepository<Reunion, Long> {
}