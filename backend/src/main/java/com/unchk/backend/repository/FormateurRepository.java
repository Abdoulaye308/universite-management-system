package com.unchk.backend.repository;

import com.unchk.backend.entity.Formateur;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FormateurRepository
        extends JpaRepository<Formateur, Long> {
}