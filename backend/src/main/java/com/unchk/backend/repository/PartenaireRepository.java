package com.unchk.backend.repository;

import com.unchk.backend.entity.Partenaire;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PartenaireRepository
        extends JpaRepository<Partenaire, Long> {
}