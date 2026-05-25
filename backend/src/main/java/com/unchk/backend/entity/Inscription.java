package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "inscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inscription {

    // Clé primaire
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ID étudiant
    private Long studentId;

    // ID formation
    private Long formationId;
}