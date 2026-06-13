package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "insertions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Insertion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // ETUDIANT
    // =========================

    private Long studentId;

    private String etudiant;

    private String formation;

    // =========================
    // INSERTION
    // =========================

    // AUTO_EMPLOI
    // EMPLOI_SALARIE
    private String typeInsertion;

    // Entreprise si salarié
    private String entreprise;

    // Poste occupé
    private String poste;

    // Date insertion
    private String dateInsertion;
    private String commentaire;
}