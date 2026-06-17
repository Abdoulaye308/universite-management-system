package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "emplois_du_temps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmploiDuTemps {

    // Clé primaire
    @Id

    // ID auto incrémenté
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Formation concernée
    private String formation;

    // Jour
    private String jour;

    // Heure début
    private String heureDebut;

    // Heure fin
    private String heureFin;

    // Salle
    private String salle;

    // Module enseigné
    private String module;

    // Enseignant
    private String enseignant;
}