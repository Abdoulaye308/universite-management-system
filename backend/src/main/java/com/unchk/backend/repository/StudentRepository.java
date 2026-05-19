package com.unchk.backend.repository;

import com.unchk.backend.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

// Repository JPA pour accéder à la table students
public interface StudentRepository extends JpaRepository<Student, Long> {
}