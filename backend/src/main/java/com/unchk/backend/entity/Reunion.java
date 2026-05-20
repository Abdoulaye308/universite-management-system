package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // Table SQL
@Table(name = "reunions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reunion {

    // Clé primaire
    @Id

    // ID auto incrémenté
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Type réunion
    // Tutorat, Cours, Evaluation
    private String type;

    // Sujet réunion
    private String sujet;

    // Date réunion
    private String date;

    // Heure réunion
    private String heure;

    // Salle
    private String salle;

    // Participants
    private String participants;

    // Compte rendu
    @Column(length = 5000)
    private String compteRendu;
}