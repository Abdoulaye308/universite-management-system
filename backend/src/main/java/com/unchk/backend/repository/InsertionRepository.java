package com.unchk.backend.repository;

import com.unchk.backend.entity.Insertion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsertionRepository
        extends JpaRepository<Insertion, Long> {
}