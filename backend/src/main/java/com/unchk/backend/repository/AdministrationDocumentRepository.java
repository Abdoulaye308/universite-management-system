package com.unchk.backend.repository;

import com.unchk.backend.entity.AdministrationDocument;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministrationDocumentRepository
        extends JpaRepository<AdministrationDocument, Long> {
}