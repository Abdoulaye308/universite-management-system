package com.unchk.backend.repository;

import com.unchk.backend.entity.Document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository
        extends JpaRepository<Document, Long> {

    List<Document> findByRoleCible(String roleCible);
}