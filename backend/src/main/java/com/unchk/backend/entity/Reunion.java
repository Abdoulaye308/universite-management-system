package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "reunions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reunion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Type réunion
    private String type;

    // Sujet
    private String sujet;

    // Date
    private String date;

    // Heure
    private String heure;

    // Salle
    private String salle;

    // =========================
    // FORMATION
    // =========================
    private Long formationId;

    private String formationNom;

    // =========================
    // FORMATEUR
    // =========================
    private Long formateurId;

    private String formateurNom;

    // Participants texte libre
    private String participants;

    // Compte rendu
    @Column(length = 5000)
    private String compteRendu;

    private String serviceConcerne;
}