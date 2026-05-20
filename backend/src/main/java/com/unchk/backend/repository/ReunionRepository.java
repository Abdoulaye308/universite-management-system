package com.unchk.backend.repository;

import com.unchk.backend.entity.Reunion;

import org.springframework.data.jpa.repository.JpaRepository;

// Repository réunions
public interface ReunionRepository
        extends JpaRepository<Reunion, Long> {
}