package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // ETUDIANT
    // =========================

    private Long studentId;

    private String etudiant;

    // =========================
    // FORMATION
    // =========================

    private String formation;

    // =========================
    // PARTENAIRE
    // =========================

    private Long partenaireId;

    private String organisme;

    // =========================
    // STAGE
    // =========================

    private String dateDebut;

    private String dateFin;

    // En cours / Terminé / Abandonné
    private String statut;

    // =========================
    // BILAN
    // =========================

    @Column(length = 5000)
    private String bilan;
}