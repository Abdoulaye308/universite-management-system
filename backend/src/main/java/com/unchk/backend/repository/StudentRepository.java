package com.unchk.backend.repository;

import com.unchk.backend.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    // Rechercher étudiant par email
    Optional<Student> findByEmail(
            String email
    );
}